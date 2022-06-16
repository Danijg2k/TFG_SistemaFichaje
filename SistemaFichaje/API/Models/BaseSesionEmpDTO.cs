/// <summary>
/// DTO base de 'SesionEmp', usado para mostrar datos en Angular Calendar
/// </summary>

public class BaseSesionEmpDTO
{
    public int IdSesion { get; set; }
    public int IdEmpleado { get; set; }
    public DateTime Fecha { get; set; }
    public string Nombre { get; set; }
}