using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;

/// <summary>
/// 'Empleado' service
/// </summary>

public class EmpleadoService : IEmpleadoService
{
    private readonly FichajeContext _context;
    private readonly IMapper _mapper;

    public EmpleadoService(FichajeContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public EmpleadoDTO Add(BaseEmpleadoDTO baseEmpleado)
    {
        var _mappedEmpleado = _mapper.Map<EmpleadoEntity>(baseEmpleado);
        var entityAdded = _context.Empleados.Add(_mappedEmpleado);
        _context.SaveChanges();
        return _mapper.Map<EmpleadoDTO>(entityAdded);
    }

    public void Delete(int guid)
    {
        EmpleadoEntity empleado = _context.Empleados.FirstOrDefault(x => x.Id == guid);

        if (empleado == null)
            throw new ApplicationException($"empleado with id {guid} not found");

        _context.Empleados.Remove(empleado);
        _context.SaveChanges();
    }

    public IEnumerable<EmpleadoDTO> GetAll()
    {
        return _mapper.Map<IEnumerable<EmpleadoDTO>>(_context.Empleados.Select(x => x));
    }

    public EmpleadoDTO GetByID(int guid)
    {
        return _mapper.Map<EmpleadoDTO>(_context.Empleados.FirstOrDefault(x => x.Id == guid));
    }

    public EmpleadoDTO GetByUser(string email)
    {
        return _mapper.Map<EmpleadoDTO>(_context.Empleados.FirstOrDefault(x => x.Correo == email));
    }

    public EmpleadoDTO Modify(BaseEmpleadoDTO empleado, int guid)
    {
        var _mappedEmpleado = _mapper.Map<EmpleadoEntity>(empleado);
        _mappedEmpleado.Id = guid;

        EmpleadoEntity modifiedEmpleado = _context.Empleados.FirstOrDefault(x => x.Id == guid);

        if (modifiedEmpleado == null)
            return null;

        _context.Entry(modifiedEmpleado).CurrentValues.SetValues(_mappedEmpleado);

        _context.SaveChanges();

        return _mapper.Map<EmpleadoDTO>(_mappedEmpleado);
    }

}