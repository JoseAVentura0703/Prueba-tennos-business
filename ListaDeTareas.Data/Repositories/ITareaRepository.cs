using ListaDeTareas.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListaDeTareas.Data.Repositories
{
    public interface ITareaRepository
    {
        Task<IEnumerable<Tarea>> GetAllTareas();
        Task<Tarea> GetTareaById(int id);
        Task<bool> InsertTarea(Tarea tarea);
        Task<bool> UpdateTarea(int id, Tarea tarea);
        Task<bool> DeleteTarea(int id);
    }
}
