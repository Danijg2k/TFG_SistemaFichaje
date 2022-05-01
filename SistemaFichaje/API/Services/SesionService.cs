using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;

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

    public void Delete(int guid)
    {
        SesionEntity sesion = _context.Sesiones.FirstOrDefault(x => x.Id == guid);

        if (sesion == null)
            throw new ApplicationException($"sesion with id {guid} not found");

        _context.Sesiones.Remove(sesion);
        _context.SaveChanges();
    }

    public IEnumerable<SesionDTO> GetAll()
    {
        return _mapper.Map<IEnumerable<SesionDTO>>(_context.Sesiones.Select(x => x));
    }

    public SesionDTO GetByID(int guid)
    {
        return _mapper.Map<SesionDTO>(_context.Sesiones.FirstOrDefault(x => x.Id == guid));
    }

    public SesionDTO Modify(BaseSesionDTO sesion, int guid)
    {
        var _mappedSesion = _mapper.Map<SesionEntity>(sesion);
        _mappedSesion.Id = guid;

        SesionEntity modifiedSesion = _context.Sesiones.FirstOrDefault(x => x.Id == guid);

        if (modifiedSesion == null)
            return null;

        _context.Entry(modifiedSesion).CurrentValues.SetValues(_mappedSesion);

        _context.SaveChanges();

        return _mapper.Map<SesionDTO>(_mappedSesion);
    }

}