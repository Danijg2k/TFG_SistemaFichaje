using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;

public class LoginService : ILoginService
{
    private readonly FichajeContext _context;
    private readonly IMapper _mapper;

    public LoginService(FichajeContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public EmpleadoDTO GetByUser(String user)
    {

        return _mapper.Map<EmpleadoDTO>(_context.Empleados.FirstOrDefault(x => x.Correo == user));
    }
}