using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;

/// <summary>
/// Interface used for 'Sesion' service
/// </summary>

public interface ISesionService
{
    public IEnumerable<SesionDTO> GetAll();

    public SesionDTO GetByID(int guid);

    public SesionDTO Add(BaseSesionDTO guid);

    public void Delete(int guid);

    public SesionDTO Modify(BaseSesionDTO Sesion, int guid);
}