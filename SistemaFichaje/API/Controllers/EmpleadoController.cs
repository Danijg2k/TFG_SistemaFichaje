using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class EmpleadosController : ControllerBase
{
    private readonly ILogger<EmpleadosController> _logger;
    private readonly IEmpleadoService _empleadoService;


    /// <summary>
    /// Crea un empleadoController
    /// </summary>
    /// <param name="logger">usado para logging</param>
    /// <param name="empleadoService">usado para tratar con información de empleado</param>
    public EmpleadosController(ILogger<EmpleadosController> logger, IEmpleadoService empleadoService)
    {
        _logger = logger;
        _empleadoService = empleadoService;
    }


    /// <summary>
    /// Devuelve todos los empleados
    /// </summary>
    /// <returns>Devuelve lista de <see cref="EmpleadoDTO"/></returns>
    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    public ActionResult<EmpleadoDTO> Get()
    {
        EmpleadoCheck.isAdmin(_empleadoService, HttpContext);
        return Ok(_empleadoService.GetAll());
    }

    /// <summary>
    /// Devuelve empleado buscado por su email
    /// </summary>
    /// <param name="Email">Correo del empleado a buscar</param>
    /// <returns>Devuelve <see cref="EmpleadoDTO"/></returns>
    [Authorize]
    [HttpGet("GetByEmail/{Email}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<EmpleadoDTO> Get(string Email)
    {
        EmpleadoDTO result = _empleadoService.GetByUser(Email);
        if (result == null)
            return NotFound();
        EmpleadoCheck.isSameUser(_empleadoService, HttpContext, result.Id);
        return Ok(result);
    }


    /// <summary>
    /// Envía datos de un empleado
    /// </summary>
    /// <param name="baseEmpleado">Datos del empleado que se crea</param>
    /// <returns>Devuelve <see cref="EmpleadoDTO"/></returns>
    [Authorize]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    public ActionResult<EmpleadoDTO> Post([FromBody] BaseEmpleadoDTO baseEmpleado)
    {
        // Solo puede crear cuentas el Admin
        EmpleadoCheck.isAdmin(_empleadoService, HttpContext);
        // Comprobamos si correo y dni existen
        if (_empleadoService.EmailExists(baseEmpleado.Correo))
        {
            return BadRequest("Ese email ya está registrado");
        }
        if (_empleadoService.DniExists(baseEmpleado.Dni))
        {
            return BadRequest("Ese DNI ya está registrado");
        }
        // Ciframos la contraseña que viene de la web
        baseEmpleado.HashPassword = HashPassword.sha256(baseEmpleado.HashPassword);
        return Ok(_empleadoService.Add(baseEmpleado));
    }


    /// <summary>
    /// Actualiza datos de un empleado
    /// </summary>
    /// <param name="Id">Id del empleado a actualizar</param>
    /// <param name="personPatch">Datos actualizados del empleado</param>
    /// <returns>Devuelve <see cref="EmpleadoDTO"/></returns>
    [Authorize]
    [HttpPatch("update/{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    public ActionResult<EmpleadoDTO> Patch(int Id, [FromBody] JsonPatchDocument<EmpleadoDTO> personPatch)
    {
        if (personPatch != null)
        {
            var empleado = _empleadoService.GetByID(Id);
            if (empleado != null)
            {
                // No poder actualizar datos ajenos (excepto siendo Admin)
                EmpleadoCheck.isSameUser(_empleadoService, HttpContext, empleado.Id);

                personPatch.ApplyTo(empleado);
                return Ok(_empleadoService.Modify(empleado, Id));
            }
        }
        return BadRequest();
    }

}
