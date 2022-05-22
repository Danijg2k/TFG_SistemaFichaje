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
        return Ok(_empleadoService.GetAll());
    }

    [HttpGet("GetById/{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<EmpleadoDTO> Get(int Id)
    {
        EmpleadoDTO result = _empleadoService.GetByID(Id);

        if (result == null)
            return NotFound();

        return Ok(result);

    }

    [HttpGet("GetByEmail/{Email}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<EmpleadoDTO> Get(string Email)
    {
        EmpleadoDTO result = _empleadoService.GetByUser(Email);

        if (result == null)
            return NotFound();

        return Ok(result);

    }


    [HttpDelete("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<EmpleadoDTO> Delete(int Id)
    {
        EmpleadoDTO result = _empleadoService.GetByID(Id);

        if (result == null)
            return NotFound();

        _empleadoService.Delete(Id);

        return Ok(result);

    }



    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    public ActionResult<EmpleadoDTO> Post([FromBody] BaseEmpleadoDTO baseEmpleado)
    {

        return Ok(_empleadoService.Add(baseEmpleado));
    }

    [HttpPut("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpleadoDTO))]
    public ActionResult<EmpleadoDTO> Put([FromBody] BaseEmpleadoDTO baseEmpleado, int Id)
    {

        return Ok(_empleadoService.Modify(baseEmpleado, Id));
    }

}
