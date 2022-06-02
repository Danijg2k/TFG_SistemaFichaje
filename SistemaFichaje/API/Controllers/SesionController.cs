using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SesionesController : ControllerBase
{
    private readonly ILogger<SesionesController> _logger;
    private readonly ISesionService _sesionService;
    private readonly ISesionEmpService _sesionEmpService;

    /// <summary>
    /// It creates a sesionController
    /// </summary>
    /// <param name="logger">used for logging</param>
    /// <param name="sesionService">used for dealing with the sesion data</param>
    public SesionesController(ILogger<SesionesController> logger, ISesionService sesionService, ISesionEmpService sesionEmpService)
    {
        _logger = logger;
        _sesionService = sesionService;
        _sesionEmpService = sesionEmpService;
    }


    /// <summary>
    /// Returns all the Sesion
    /// </summary>
    /// <returns>Returns a list of <see cref="SesionDTO"/></returns>
    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionDTO))]
    public ActionResult<SesionDTO> Get()
    {
        return Ok(_sesionService.GetAll());
    }

    [HttpGet("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<SesionDTO> Get(int Id)
    {
        SesionDTO result = _sesionService.GetByID(Id);

        if (result == null)
            return NotFound();

        return Ok(result);

    }



    /// <summary>
    /// Returns all the SesionEmp
    /// </summary>
    /// <returns>Returns a list of <see cref="SesionEmpDTO"/></returns>
    // [Authorize]
    [HttpGet("sesionEmp/")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionEmpDTO))]
    public ActionResult<SesionEmpDTO> GetAllSesionEmpleado()
    {
        return Ok(_sesionEmpService.GetAllSesionEmp());
    }



    /// <summary>
    /// Returns SesionEmp of specific user
    /// </summary>
    /// <returns>Returns a list of <see cref="SesionEmpDTO"/></returns>
    // [Authorize]
    [HttpGet("sesionEmp/{IdEmp}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionEmpDTO))]
    public ActionResult<SesionEmpDTO> GetSesionEmpleado(int IdEmp)
    {
        return Ok(_sesionEmpService.GetByIdSesion(IdEmp));
    }


}
