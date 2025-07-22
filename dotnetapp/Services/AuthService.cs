using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using dotnetapp.Data;




namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AuthService> _logger;

        public AuthService(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ApplicationDbContext context,
            ILogger<AuthService> logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
            _logger = logger;
        }

        

        public async Task<(int, string)> Registration(User model, string role)
        {
            try
            {
                // Check if the email already exists
                var existingUser = await _userManager.FindByEmailAsync(model.Email);
                if (existingUser != null)
                    return (400, "User already exists");

                // Create the user
                var applicationUser = new ApplicationUser
                {
                    UserName = model.Username,
                    Email = model.Email,
                    Name = model.Username
                };

                var result = await _userManager.CreateAsync(applicationUser, model.Password);

                if (!result.Succeeded)
                    return (500, "User creation failed! Please check user details and try again");

                // Assign the role to the user
                if (!await _roleManager.RoleExistsAsync(role))
                    await _roleManager.CreateAsync(new IdentityRole(role));

                await _userManager.AddToRoleAsync(applicationUser, role);
                await _context.SaveChangesAsync();

                _context.Users.Add(model);
                _context.SaveChanges();

                return (200, "User created successfully!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during user registration."); // Log the error
                return (500, $"An error occurred: {ex.Message} | Inner Exception: {ex.InnerException?.Message}");
            }
        }

       public async Task<(int, string)> Login(LoginModel login)
        {
            // Find user by email
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user == null)
                return (400, "Invalid email");

            // Retrieve the login user and get the userId
            var userLogined = await _context.Users.FirstOrDefaultAsync(t => t.Email == login.Email);
            if (userLogined == null)
                return (400, "Invalid email");

            // Verify the password
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, login.Password);
            if (!isPasswordValid)
                return (400, "Invalid password");

            // Generate JWT token
            Console.WriteLine("User : " + user.Email);
            var userRoles = await _userManager.GetRolesAsync(user);
            Console.WriteLine("UserRole : " + userRoles);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, userLogined.UserId.ToString()), // Ensure userId is of type int
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = GenerateToken(authClaims);
            return (200, token);
        }


        public async Task<IEnumerable<User>> GetAllUsers()
        {
            try
            {
                return await _context.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                // Log the exception (you can use a logging framework)
                Console.WriteLine($"An error occurred: {ex.Message}");
                
                // Return an empty list 
                return new List<User>();
            }
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
        // Add additional claims
        var key = Environment.GetEnvironmentVariable("Secret") ??
            throw new ApplicationException("JWT key is not configured."); 
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
     
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds,
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}