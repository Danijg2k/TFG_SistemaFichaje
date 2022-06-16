/// <summary>
/// DTO base de 'Empleado', usado en creación
/// </summary>

public class BaseEmpleadoDTO
{
    public string Nombre { get; set; }
    public int Edad { get; set; }
    public string Direccion { get; set; }
    public string Puesto { get; set; }
    public string Dni { get; set; }
    public string Correo { get; set; }
    // Contraseña cifrada mediante hash
    public string HashPassword { get; set; }
    public Boolean Rol { get; set; }
}

