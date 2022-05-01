using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;

/// <summary>
/// Interface used for 'Cuenta' service
/// </summary>

public interface ICuentaService
{
    public IEnumerable<CuentaDTO> GetAll();

    public CuentaDTO GetByID(int guid);

    public CuentaDTO Add(BaseCuentaDTO guid);

    public void Delete(int guid);

    public CuentaDTO Modify(BaseCuentaDTO Cuenta, int guid);
}