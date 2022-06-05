using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;

/// <summary>
/// Interface used for 'Sesion' service
/// </summary>

public interface ISesionService
{
    public IEnumerable<SesionDTO> GetAll();
    public SesionDTO Add(BaseSesionDTO guid);
}