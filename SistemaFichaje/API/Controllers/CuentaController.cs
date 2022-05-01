using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class CuentasController : ControllerBase
{
    private readonly ILogger<CuentasController> _logger;
    private readonly ICuentaService _cuentaService;


    /// <summary>
    /// It creates a cuentaController
    /// </summary>
    /// <param name="logger">used for logging</param>
    /// <param name="cuentaService">used for dealing with the cuenta data</param>
    public CuentasController(ILogger<CuentasController> logger, ICuentaService cuentaService)
    {
        _logger = logger;
        _cuentaService = cuentaService;
    }


    /// <summary>
    /// Returns all the Cuenta
    /// </summary>
    /// <returns>Returns a list of <see cref="CuentaDTO"/></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CuentaDTO))]
    public ActionResult<CuentaDTO> Get()
    {
        return Ok(_cuentaService.GetAll());
    }

    [HttpGet("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CuentaDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<CuentaDTO> Get(int Id)
    {
        CuentaDTO result = _cuentaService.GetByID(Id);

        if (result == null)
            return NotFound();

        return Ok(result);

    }


    [HttpDelete("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CuentaDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<CuentaDTO> Delete(int Id)
    {
        CuentaDTO result = _cuentaService.GetByID(Id);

        if (result == null)
            return NotFound();

        _cuentaService.Delete(Id);

        return Ok(result);

    }



    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CuentaDTO))]
    public ActionResult<CuentaDTO> Post([FromBody] BaseCuentaDTO baseCuenta)
    {

        return Ok(_cuentaService.Add(baseCuenta));
    }

    [HttpPut("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CuentaDTO))]
    public ActionResult<CuentaDTO> Put([FromBody] BaseCuentaDTO baseCuenta, int Id)
    {

        return Ok(_cuentaService.Modify(baseCuenta, Id));
    }

}
