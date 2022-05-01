using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// 'Cuenta' entity
/// </summary>

[Table("Cuenta")]
public class CuentaEntity
{

    [MaxLength(100)]
    public string Correo { get; set; }
    [MaxLength(50)]
    public string Contrasena { get; set; }
    public DateTime FechaCreacion { get; set; }
    [MaxLength(50)]
    public string Rol { get; set; }
    public int Id { get; set; }

}
