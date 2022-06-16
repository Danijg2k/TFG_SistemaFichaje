using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

/// <summary>
/// Servicio utilizado para comprobar autorización (deserializar)
/// </summary>

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        EmpleadoDTO user = null;
        try
        {
            user = JsonConvert.DeserializeObject<EmpleadoDTO>(context.HttpContext.Items["X-User"].ToString());
        }
        catch (SystemException) { }

        if (user == null)
        {
            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}