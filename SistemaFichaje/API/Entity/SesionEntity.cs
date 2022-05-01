using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// 'Sesion' entity
/// </summary>

[Table("Sesion")]
public class SesionEntity
{

    public int IdEmpleado { get; set; }
    public DateTime Fecha { get; set; }
    public TimeSpan Hora { get; set; }
    public int Id { get; set; }

}
