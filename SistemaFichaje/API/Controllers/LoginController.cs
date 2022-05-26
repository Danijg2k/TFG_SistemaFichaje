using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PI.CursoAngular.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<LoginController> _logger;
        private readonly ILoginService _loginService;



        public LoginController(IConfiguration configuration, ILogger<LoginController> logger, ILoginService loginService)
        {
            _configuration = configuration;
            _logger = logger;
            _loginService = loginService;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(BaseLoginDTO login)
        {
            var hash = "";

            try
            {
                hash = _loginService.GetByUser(login.Usuario).HashPassword;
                login.Contra = HashPassword.sha256(login.Contra);

                //Verifica si hash de login coincide con hash de DDBB
                if (hash != login.Contra)
                {
                    return BadRequest("Usuario/Contraseña incorrectos");
                }

                //Genera el token
                var token = GenerarToken(login);

                return Ok(new
                {
                    response = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception e)
            {
                _logger.LogError("Login: " + e.Message, e);
                return BadRequest("Usuario/Contraseña incorrectos");
            }
        }

        private JwtSecurityToken GenerarToken(BaseLoginDTO login)
        {
            string ValidIssuer = _configuration["ApiAuth:Issuer"];
            string ValidAudience = _configuration["ApiAuth:Audience"];
            SymmetricSecurityKey IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["ApiAuth:SecretKey"]));

            //La fecha de expiracion sera el mismo dia a las 12 de la noche
            DateTime dtFechaExpiraToken;
            DateTime now = DateTime.Now;
            dtFechaExpiraToken = new DateTime(now.Year, now.Month, now.Day, 23, 59, 59, 999);

            //Agregamos los claim nuestros
            var claims = new[]
            {
                new Claim("user", login.Usuario)
            };

            return new JwtSecurityToken
            (
                issuer: ValidIssuer,
                audience: ValidAudience,
                claims: claims,
                expires: dtFechaExpiraToken,
                notBefore: now,
                signingCredentials: new SigningCredentials(IssuerSigningKey, SecurityAlgorithms.HmacSha256)
            );
        }
    }
}