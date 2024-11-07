using Dapper;
using ListaDeTareas.Model;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListaDeTareas.Data.Repositories
{
    public class TareaRepository : ITareaRepository
    {
        private readonly MySQLConfiguration _connectionString;
        public TareaRepository(MySQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }
        
        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }
        public async Task<bool> DeleteTarea(int id)
        {
            var db = dbConnection();

            var sql = @"DELETE FROM tareas WHERE id = @Id";

            var result = await db.ExecuteAsync(sql, new { Id = id });

            return result > 0;
        }

        public async Task<IEnumerable<Tarea>> GetAllTareas()
        {
            var db = dbConnection();

            var sql = @" SELECT id, title, description, date, time, category, state
                         FROM tareas ";

            return await db.QueryAsync<Tarea>(sql, new {});
        }

        public async Task<Tarea> GetTareaById(int id)
        {
            var db = dbConnection();

            var sql = @" SELECT id, title, description, date, time, category, state
                         FROM tareas
                         WHERE id = @Id";

            return await db.QueryFirstOrDefaultAsync<Tarea>(sql, new { Id = id });
        }

        public async Task<bool> InsertTarea(Tarea tarea)
        {
            var db = dbConnection();

            var sql = @" INSERT INTO tareas(title, description, date, time, category, state)
                         VALUES(@Title, @Description, @Date, @Time, @Category, @State)";

            var result = await db.ExecuteAsync(sql, new
            { tarea.Title, tarea.Description, tarea.Date, tarea.Time, tarea.Category, tarea.State});

            return result > 0;
        }

        public async Task<bool> UpdateTarea(int Id, Tarea tarea)
        {
            var db = dbConnection();

            var sql = @" UPDATE tareas
                         SET title = @Title,
                             description = @Description,
                             date = @Date, 
                             time = @Time, 
                             category = @Category,
                             state = @State
                         WHERE id = @Id";

            var result = await db.ExecuteAsync(sql, new
            { Id, tarea.Title, tarea.Description, tarea.Date, tarea.Time, tarea.Category, tarea.State });

            return result > 0;
        }
    }
}
