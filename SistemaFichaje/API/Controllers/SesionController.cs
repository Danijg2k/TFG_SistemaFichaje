using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SesionesController : ControllerBase
{
    private readonly ILogger<SesionesController> _logger;
    private readonly ISesionService _sesionService;


    /// <summary>
    /// It creates a sesionController
    /// </summary>
    /// <param name="logger">used for logging</param>
    /// <param name="sesionService">used for dealing with the sesion data</param>
    public SesionesController(ILogger<SesionesController> logger, ISesionService sesionService)
    {
        _logger = logger;
        _sesionService = sesionService;
    }


    /// <summary>
    /// Returns all the Sesion
    /// </summary>
    /// <returns>Returns a list of <see cref="SesionDTO"/></returns>
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


    [HttpDelete("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<SesionDTO> Delete(int Id)
    {
        SesionDTO result = _sesionService.GetByID(Id);

        if (result == null)
            return NotFound();

        _sesionService.Delete(Id);

        return Ok(result);

    }



    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionDTO))]
    public ActionResult<SesionDTO> Post([FromBody] BaseSesionDTO baseSesion)
    {

        return Ok(_sesionService.Add(baseSesion));
    }

    [HttpPut("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SesionDTO))]
    public ActionResult<SesionDTO> Put([FromBody] BaseSesionDTO baseSesion, int Id)
    {

        return Ok(_sesionService.Modify(baseSesion, Id));
    }

}
