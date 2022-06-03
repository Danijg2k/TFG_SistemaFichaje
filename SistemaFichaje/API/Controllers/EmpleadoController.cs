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
    /// It creates a empleadoController
    /// </summary>
    /// <param name="logger">used for logging</param>
    /// <param name="empleadoService">used for dealing with the empleado data</param>
    public EmpleadosController(ILogger<EmpleadosController> logger, IEmpleadoService empleadoService)
    {
        _logger = logger;
        _empleadoService = empleadoService;
    }


    /// <summary>
    /// Returns all the Empleado
    /// </summary>
    /// <returns>Returns a list of <see cref="EmpleadoDTO"/></returns>
    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    public ActionResult<EmpleadoDTO> Get()
    {
        EmpleadoCheck.isAdmin(_empleadoService, HttpContext);
        return Ok(_empleadoService.GetAll());
    }


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


    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    public ActionResult<EmpleadoDTO> Post([FromBody] BaseEmpleadoDTO baseEmpleado)
    {
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


    [HttpPatch("update/{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    public ActionResult<EmpleadoDTO> Patch(int Id, [FromBody] JsonPatchDocument<EmpleadoDTO> personPatch)
    {
        if (personPatch != null)
        {
            var empleado = _empleadoService.GetByID(Id);
            if (empleado != null)
            {
                personPatch.ApplyTo(empleado);
                return Ok(_empleadoService.Modify(empleado, Id));
            }
        }
        return BadRequest();
    }

}
