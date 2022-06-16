using AutoMapper;

/// <summary>
/// 'SesionEmp' service
/// </summary>

public class SesionEmpService : ISesionEmpService
{
    private readonly FichajeContext _context;
    private readonly IMapper _mapper;

    public SesionEmpService(FichajeContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public IEnumerable<SesionEmpDTO> GetByIdSesion(int id)
    {
        return (from Empleados in _context.Empleados
                join Fichajes in _context.Sesiones
                on Empleados.Id equals Fichajes.IdEmpleado
                where Fichajes.IdEmpleado == id

                select new SesionEmpDTO
                {
                    IdSesion = Fichajes.Id,
                    IdEmpleado = Empleados.Id,
                    Fecha = Fichajes.Fecha,
                    Nombre = Empleados.Nombre
                });
    }

    public IEnumerable<SesionEmpDTO> GetAllSesionEmp()
    {
        return (from Empleados in _context.Empleados
                join Fichajes in _context.Sesiones
                on Empleados.Id equals Fichajes.IdEmpleado

                select new SesionEmpDTO
                {
                    IdSesion = Fichajes.Id,
                    IdEmpleado = Empleados.Id,
                    Fecha = Fichajes.Fecha,
                    Nombre = Empleados.Nombre
                });
    }
}