/// <summary>
/// Base DTO of 'Cuenta', used in creation
/// </summary>

public class BaseCuentaDTO
{
    public string Correo { get; set; }
    public string Contrasena { get; set; }
    public DateTime FechaCreacion { get; set; }
    public string Rol { get; set; }
}