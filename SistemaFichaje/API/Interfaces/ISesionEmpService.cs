using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;

/// <summary>
/// Interface used for 'SesionEmp' service
/// </summary>

public interface ISesionEmpService
{
    // Usado por calendario User
    public IEnumerable<SesionEmpDTO> GetByIdSesion(int id);

    // Usado por calendario Admin
    public IEnumerable<SesionEmpDTO> GetAllSesionEmp();

}