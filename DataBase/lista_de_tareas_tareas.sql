-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS lista_de_tareas;
USE lista_de_tareas;

-- Creación de la tabla "tareas"
CREATE TABLE IF NOT EXISTS tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  date VARCHAR(30) NOT NULL,
  time VARCHAR(8),
  category varchar(45) NOT NULL,
  state varchar(1) NOT NULL
);

-- Inserción de datos en la tabla "tareas"
INSERT INTO tareas (title, description, date, time, category, state) VALUES 
('Estudiar Programacion Movil', 'Estudiar y investigar las diferentes tecnologias para el desarrollo movil.', '2024-05-10', '09:30', 'Personal', '1'),
('Estudiar los principios SOLID', 'Investigar sobre los principios SOLID, como se implementan y cuales son sus ventajas.', '2024-05-12', '17:00', 'Personal', '1'),
('Comprar pizza para cenar', '', '2024-05-09', '16:24', 'Compras', '2');