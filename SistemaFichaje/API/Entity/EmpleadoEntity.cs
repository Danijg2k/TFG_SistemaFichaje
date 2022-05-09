using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// 'Empleado' entity
/// </summary>

[Table("Empleado")]
public class EmpleadoEntity
{

    [MaxLength(200)]
    public string Nombre { get; set; }
    public int Edad { get; set; }
    [MaxLength(150)]
    public string Direccion { get; set; }
    [MaxLength(50)]
    public string Puesto { get; set; }
    [MaxLength(9)]
    public string Dni { get; set; }
    [MaxLength(100)]
    public string Correo { get; set; }
    public string HashPassword { get; set; }
    public Boolean Rol { get; set; }
    public int Id { get; set; }

}
