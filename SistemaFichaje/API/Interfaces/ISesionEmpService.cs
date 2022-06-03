using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;

/// <summary>
/// Interface used for 'SesionEmp' service
/// </summary>

public interface ISesionEmpService
{
    // Devuelve todos los fichajes del empleado con esa Id
    public IEnumerable<SesionEmpDTO> GetByIdSesion(int id);

    // Devuelve todos los fichajes
    public IEnumerable<SesionEmpDTO> GetAllSesionEmp();

}