using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;

/// <summary>
/// Interface used for 'Empleado' service
/// </summary>

public interface IEmpleadoService
{
    public IEnumerable<EmpleadoDTO> GetAll();

    public EmpleadoDTO GetByID(int guid);

    public EmpleadoDTO GetByUser(string email);

    // Utilizados para ver si existen ya en el formulario de Account
    public Boolean EmailExists(string email);

    public Boolean DniExists(string dni);
    //

    public EmpleadoDTO Add(BaseEmpleadoDTO guid);

    public void Delete(int guid);

    public EmpleadoDTO Modify(BaseEmpleadoDTO Empleado, int guid);
}