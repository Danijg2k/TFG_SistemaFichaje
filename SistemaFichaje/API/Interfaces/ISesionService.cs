/// <summary>
/// Interfaz usada por 'Sesion' service
/// </summary>

public interface ISesionService
{
    public IEnumerable<SesionDTO> GetAll();
    public SesionDTO Add(BaseSesionDTO guid);
}