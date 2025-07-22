using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Cors;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    //[Authorize]
    public class SuperAdminController : ControllerBase
    {
        private readonly SuperAdminService  _service;
        public SuperAdminController(SuperAdminService  service)
        {
         _service=service;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetAllCourses()
        {
            try{
                var admins=await _service.GetAllAdmins();
                return Ok(admins);
            }
            catch(Exception ex)
            {
               return StatusCode(500,$"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddAdmin([FromBody] SuperAdmin admin)
        {
            try
            {
             
                bool isAdded = await _service.AddAdmin(admin);
                if(isAdded)
                {
                    return Ok(new {msg = "Admin added successfully"});
                }
                else
                {
                    return StatusCode(500,new {msg = "Failed to add Admin"});
                }
            }
            catch(CourseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [HttpPut("{id}")]      
        public async Task<ActionResult> UpdateCourse(int id,[FromBody] SuperAdmin admin)
        {
                try
                {
                   bool isUpdated =await _service.UpdateAdminStatus(id,admin);
                   if(isUpdated)
                   {
                    return Ok(new {msg = "Admin Status Approved"});
                   }
                   else{
                    return NotFound(new {msg = "Admin Status Rejected"});
                   }
                 
                }
                catch(CourseException ex)
                {
                    return NotFound(ex.Message);
                }
                catch(Exception ex)
                {
                  return StatusCode(500,$"Internal server error: {ex.Message}");
                }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFeedback(int id){
            try{
                var success=await _service.DeleteAdmin(id);
                if(success){
                    return Ok(new {msg = "Admin deleted successfully."});
                }
                return NotFound(new {msg = "Cannot find any Admin."});
            }catch(Exception ex){
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("{email}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAdminReqById(string email){
            try{
                var admin=await _service.GetAdminReqById(email);
                if(admin==null || !admin.Any()){
                    return NotFound();
                }
                return Ok(admin);
            }catch (Exception ex){
                return StatusCode(500, ex.Message);
            }
        }
    }
}