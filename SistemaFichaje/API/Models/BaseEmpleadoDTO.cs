/// <summary>
/// Base DTO of 'Empleado', used in creation
/// </summary>

public class BaseEmpleadoDTO
{
    public string Nombre { get; set; }
    public int Edad { get; set; }
    public string Direccion { get; set; }
    public string Puesto { get; set; }
    public string Dni { get; set; }
    public string Correo { get; set; }
    public string HashPassword { get; set; }
    public Boolean Rol { get; set; }
}