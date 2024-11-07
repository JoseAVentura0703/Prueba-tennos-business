const contenedorEdicion = document.querySelector('.contenedor-editar');
const fecha = document.querySelector('#fecha');
const btnAbrirForm = document.querySelector('#abrir-form');
const btnCerrarForm = document.querySelector('#cerrar-modal');
const datos_form = document.querySelector('form');

// Direccion de la API
let apiUrl = 'https://localhost:7058/api/Tareas';

ObtenerFecha(); // inserta la fecha en el html

//Abrir ventana modal Con el formulario de Creacion

btnAbrirForm.addEventListener("click",()=>{
    const input = document.querySelector('#input').value;    //Obtiene la etiqueta con el id input y sus atributos
    document.getElementById('titulo').value = input;     //Selecciona el id title del form y inserta el valor del input
    modal.showModal();     // Hace visible el modal del formulario
})

// Cierra el modal
btnCerrarForm.addEventListener("click",()=>{
    modal.close()
})

// obtener datos del formulario
datos_form.addEventListener('submit', e =>{
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    enviarDatos(data);
})

//Obtener tareas
document.addEventListener('DOMContentLoaded', function() {
    // Llama a la función para cargar los datos de la API
    cargarDatos();
});

// Funcion para cargar todos los datos o tareas de la API
async function cargarDatos() {
    const response = await fetch(apiUrl); // llama la api por get
    const datos = await response.json();
        
    const datosDiv = document.getElementById('lista');
    datosDiv.innerHTML = ''; 

    datos.forEach(dato => {
        // Crea un nuevo div para cada dato
        const datoDiv = document.createElement('div');
        datoDiv.innerHTML = `
            <li class="elemento" id=${dato.id}>
                <i class="${dato.state === '2' ? 'far fa-check-circle co': 'far fa-circle co'}" data="Completado"></i>
                <p class="${dato.state === '2' ? 'estado-hecho': ''}">${dato.title}</p>
                <i class="fas fa-trash de" data="${dato.id}" id="eliminar"></i>
            </li>
        `;
        // Agregar el nuevo div al contenedor de la lista
        datosDiv.appendChild(datoDiv);

        // obtiene el id de la tarea seleccionada para obtener los datos que necesito para editar
        datoDiv.querySelector('.elemento').addEventListener("click", e => {
            const id = e.currentTarget.getAttribute("id");
            
            // llamo y le paso el id a la funcion para sacar la tarea que coincida con dicho id
            obtenerTareaPorId(id);
            
        });

        datoDiv.querySelector('#eliminar').addEventListener("click", e => {
            // Detener la propagación del evento clic para evitar que se ejecute el modal
            e.stopPropagation();

            const id = e.currentTarget.getAttribute("data");
            console.log(id)
            eliminarTarea(id);
        })   
    });   
}

// Funcion para enviar los datos por POST
function enviarDatos(data) {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        location.reload(); // recarga la pagina para ver los cambios
    })
    .catch(error => console.error(error));
}

// Funcion para Enviar los datos por PUT y actualizar
function enviarEditDatos(data, id) {
    console.log(data);
    fetch(apiUrl + '/' + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data)
    })
    .then(response => {console.log(response); response.json()})
    .then(data => {
        console.log(data);
        location.reload(); // recarga la pagina para ver los cambios
    })
    .catch(error => console.error(error));
}


async function obtenerTareaPorId(id) {
    const response = await fetch(apiUrl);
    // obtengo todas las tareas
    const listaTareas = await response.json();
    let tarea = {};
    // saca la tarea que coincide con el id que seleccione
    listaTareas.forEach(d =>{
        if(d.id == id){
            tarea = d;
        }
    })
    formularioEditar(tarea)           
}

// Funcion para crear el formulario de edicion
function formularioEditar(tarea){
    const formulario = 
    `
    <dialog id="modalEdicion">     
        <form action="" method="dialog">
            
            <div class="titulo-div">
                <input type="text" name="title" id="titulo" value='${tarea.title}'>
            </div>

            <div>
                <textarea name="description" id="descripcion" placeholder="Descripcion...">${tarea.description}</textarea>
            </div>

            <div class="grid">
                <div class="grid-item-3">
                    <label for="fecha-form">Fecha</label>
                    <input type="date" name="date" id="fecha-form" value='${tarea.date}'>
                </div>

                <div class="grid-item-2">
                    <label for="categoria">Categoria</label>
                    <select name="category" id="categoria">
                        <option value="1" ${tarea.category == 1 ? 'selected' : ''}>Personal</option>
                        <option value="2" ${tarea.category == 2 ? 'selected' : ''}>Trabajo</option>
                        <option value="3" ${tarea.category == 3 ? 'selected' : ''}>Compras</option>
                    </select>
                </div>
    
                <div class="grid-item-1">
                    <label for="hora">Hora de inicio</label>
                    <input type="time" name="time" id="hora" value='${tarea.time}'>
                </div>
    
            </div>

            <div>
                <label for="estado">En curso</label>
                <input type="radio" name="state" value="1" ${tarea.state == 1 ? 'checked' : ''}>

                <label for="estado">Completado</label>
                <input type="radio" name=state value="2" ${tarea.state == 2 ? 'checked' : ''}>
            </div>
            
            
            <button type="submit" class="btn-enviar" id="enviar-datos">Editar</button>
        </form>
        <button type="button" class="btn-cerrar" id="cerrar-modal">Cancelar</button>
    </dialog>
    `;

    contenedorEdicion.innerHTML = formulario;

    const modalEdicion = contenedorEdicion.querySelector('#modalEdicion');
    const btnCerrarModal = contenedorEdicion.querySelector('#cerrar-modal');

    // Event listener para cerrar el modal
    btnCerrarModal.addEventListener('click', () => {
        modalEdicion.close();
    });

    const datosFormularioEdicion = contenedorEdicion.querySelector('form');

    // Event listener para enviar los datos
    datosFormularioEdicion.addEventListener('submit', e => {
        e.preventDefault(); 
        const data = Object.fromEntries(new FormData(e.target));
        const id = tarea.id;
        enviarEditDatos(data, id);
        modalEdicion.close(); 
    });

    modalEdicion.showModal(); // Muestra el formularo para editar
}

//Funcion para eliminar las tareas por ID
function eliminarTarea(id){
    fetch(apiUrl + '/' + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", 
      },
    })
    .then(response => {console.log(response); response.json()})
    .then(data => {
        console.log(data);
        location.reload(); // recarga la pagina para ver los cambios
    })
    .catch(error => console.error(error));
}

// Obtiene la fecha actual y la inserta en el html 
function ObtenerFecha(){
    const FECHA = new Date();
    fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {weekday:'long', month:'short', day:'numeric'});
}