using AutoMapper;

/// <summary>
/// 'Sesion' service
/// </summary>

public class SesionService : ISesionService
{
    private readonly FichajeContext _context;
    private readonly IMapper _mapper;

    public SesionService(FichajeContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public SesionDTO Add(BaseSesionDTO baseSesion)
    {
        var _mappedSesion = _mapper.Map<SesionEntity>(baseSesion);
        var entityAdded = _context.Sesiones.Add(_mappedSesion);
        _context.SaveChanges();
        return _mapper.Map<SesionDTO>(entityAdded);
    }

    public IEnumerable<SesionDTO> GetAll()
    {
        return _mapper.Map<IEnumerable<SesionDTO>>(_context.Sesiones.Select(x => x));
    }
}