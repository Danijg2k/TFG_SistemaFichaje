using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;

/// <summary>
/// 'Cuenta' service
/// </summary>

public class CuentaService : ICuentaService
{
    private readonly FichajeContext _context;
    private readonly IMapper _mapper;

    public CuentaService(FichajeContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public CuentaDTO Add(BaseCuentaDTO baseCuenta)
    {
        var _mappedCuenta = _mapper.Map<CuentaEntity>(baseCuenta);
        var entityAdded = _context.Cuentas.Add(_mappedCuenta);
        _context.SaveChanges();
        return _mapper.Map<CuentaDTO>(entityAdded);
    }

    public void Delete(int guid)
    {
        CuentaEntity cuenta = _context.Cuentas.FirstOrDefault(x => x.Id == guid);

        if (cuenta == null)
            throw new ApplicationException($"cuenta with id {guid} not found");

        _context.Cuentas.Remove(cuenta);
        _context.SaveChanges();
    }

    public IEnumerable<CuentaDTO> GetAll()
    {
        return _mapper.Map<IEnumerable<CuentaDTO>>(_context.Cuentas.Select(x => x));
    }

    public CuentaDTO GetByID(int guid)
    {
        return _mapper.Map<CuentaDTO>(_context.Cuentas.FirstOrDefault(x => x.Id == guid));
    }

    public CuentaDTO Modify(BaseCuentaDTO cuenta, int guid)
    {
        var _mappedCuenta = _mapper.Map<CuentaEntity>(cuenta);
        _mappedCuenta.Id = guid;

        CuentaEntity modifiedCuenta = _context.Cuentas.FirstOrDefault(x => x.Id == guid);

        if (modifiedCuenta == null)
            return null;

        _context.Entry(modifiedCuenta).CurrentValues.SetValues(_mappedCuenta);

        _context.SaveChanges();

        return _mapper.Map<CuentaDTO>(_mappedCuenta);
    }

}