using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;

/// <summary>
/// Interfaz usada por 'Empleado' service
/// </summary>

public interface IEmpleadoService
{
    // Obtener todos los empleados
    public IEnumerable<EmpleadoDTO> GetAll();

    // Obtener empleado con una Id específica
    public EmpleadoDTO GetByID(int guid);

    // Obtener empleado con un correo específico
    public EmpleadoDTO GetByUser(string email);

    // Comprueba si el email ya está siendo utilizado
    public Boolean EmailExists(string email);

    // Comprueba si el dni pertenece a alguien ya registrado
    public Boolean DniExists(string dni);

    // Añade un empleado a la base de datos
    public EmpleadoDTO Add(BaseEmpleadoDTO guid);

    // Modificar los datos de un empleado
    public EmpleadoDTO Modify(BaseEmpleadoDTO Empleado, int guid);
}