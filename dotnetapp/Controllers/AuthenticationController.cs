using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.AspNetCore.Cors;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    [EnableCors]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
 
        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        
 
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                var(status,token) = await _authService.Login(model);
                Console.WriteLine("Status : " + status);
                Console.WriteLine("Token : " + token);
                if(status == 400 )
                {
                    Console.WriteLine("Token : " + token);
                    return Unauthorized(token);
                }
                return Ok(new {token = token});
            }
            catch(CourseException ex)
            {
                return StatusCode(500,$"Internal server error: {ex.Message}");
            }
        }
 
        [HttpPost("register")]
        public async Task<IActionResult> Register(User model)
        {
            try
            {
                var (status, message) = await _authService.Registration(model, model.UserRole);
                switch (status)
                {
                    case 0:
                        return BadRequest(new { success = false, msgs = message });
                    case 400:
                        return Ok(new { success = false, msgs = message}); // Specific Ok response for status 400
                    case 200:
                        return Ok(new { success = true, msgs = message });  // Specific Ok response for status 200
                    default:
                        return StatusCode(status, new { success = false, msgs = message });
                }
            }
            catch (CourseException ex)
            {
                return StatusCode(500, new { success = false, message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _authService.GetAllUsers();
            return Ok(users);
        }
       
    }
}