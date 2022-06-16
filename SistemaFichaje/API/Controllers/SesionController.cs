using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SesionesController : ControllerBase
{
    private readonly ILogger<SesionesController> _logger;
    private readonly ISesionEmpService _sesionEmpService;
    private readonly IEmpleadoService _empleadoService;
    private readonly ISesionService _sesionService;

    /// <summary>
    /// Crea un sesionController
    /// </summary>
    /// <param name="logger">usado para logging</param>
    /// <param name="sesionEmpService">usado para tratar con información de sesionEmp</param>
    /// <param name="empleadoService">usado para tratar con información de empleado</param>
    /// <param name="sesionService">usado para tratar con información de sesion</param>
    public SesionesController(ILogger<SesionesController> logger, ISesionEmpService sesionEmpService, IEmpleadoService empleadoService, ISesionService sesionService)
    {
        _logger = logger;
        _sesionEmpService = sesionEmpService;
        _empleadoService = empleadoService;
        _sesionService = sesionService;
    }


    /// <summary>
    /// Devuelve todos los fichajes
    /// </summary>
    /// <returns>Devuelve lista de <see cref="SesionDTO"/></returns>
    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionDTO))]
    public ActionResult<SesionDTO> Get()
    {
        return Ok(_sesionService.GetAll());
    }



    [HttpPost("{idEmp}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionDTO))]
    public ActionResult<SesionDTO> Post(int idEmp)
    {
        // Recogemos la fecha actual
        DateTime d;
        DateTime now = DateTime.Now;
        d = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, now.Second);
        // Y la enviamos
        BaseSesionDTO baseS = new BaseSesionDTO();
        baseS.IdEmpleado = idEmp;
        baseS.Fecha = d;
        return Ok(_sesionService.Add(baseS));
    }


    /// <summary>
    /// Returns all the SesionEmp
    /// </summary>
    /// <returns>Returns a list of <see cref="SesionEmpDTO"/></returns>
    [Authorize]
    [HttpGet("sesionEmp/")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionEmpDTO))]
    public ActionResult<SesionEmpDTO> GetAllSesionEmpleado()
    {
        // Solo puede ver todos los fichajes el Admin
        EmpleadoCheck.isAdmin(_empleadoService, HttpContext);
        return Ok(_sesionEmpService.GetAllSesionEmp());
    }


    /// <summary>
    /// Returns SesionEmp of specific user
    /// </summary>
    /// <returns>Returns a list of <see cref="SesionEmpDTO"/></returns>
    [Authorize]
    [HttpGet("sesionEmp/{IdEmp}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionEmpDTO))]
    public ActionResult<SesionEmpDTO> GetSesionEmpleado(int IdEmp)
    {
        // No poder visualizar fichajes ajenos (excepto siendo Admin)
        EmpleadoCheck.isSameUser(_empleadoService, HttpContext, IdEmp);
        return Ok(_sesionEmpService.GetByIdSesion(IdEmp));
    }
}
