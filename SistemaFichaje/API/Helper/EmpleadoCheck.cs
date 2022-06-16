/// <summary>
/// Servicio utilizado para comprobaciones, antes de mostrar datos
/// </summary>

public class EmpleadoCheck
{
    public static void isAdmin(IEmpleadoService _empleadoService, HttpContext context)
    {
        EmpleadoDTO emp = _empleadoService.GetByUser(context.Request.Headers["X-login"].ToString());
        // Que un usuario no pueda ver datos de otro
        if (!emp.Rol)
        {
            throw new Exception("El usuario no es admin.");
        }
        //  --><--
    }

    public static void isSameUser(IEmpleadoService _empleadoService, HttpContext context, int id)
    {
        // -->COMPROBACIONES<--
        EmpleadoDTO emp = _empleadoService.GetByUser(context.Request.Headers["X-login"].ToString());
        // Que un usuario no pueda ver datos de otro
        if (emp.Id != id && !emp.Rol)
        {
            throw new Exception("Un usuario no puede ver datos relativos a otro.");
        }
        //  --><--
    }

}
