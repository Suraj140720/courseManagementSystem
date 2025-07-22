using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Exceptions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;


namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    [Authorize]
    public class CourseApplicationController : ControllerBase
    {
        private readonly CourseApplicationService _service;
        public CourseApplicationController(CourseApplicationService service)
        {
            _service=service;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseApplication>>> GetAllCourseApplications()
        {
            try
            {
                var existing=await _service.GetAllCourseApplications();
                return Ok(existing);
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CourseApplication>>> GetCourseApplicationByUserId(int userId)
        {
            try
            {
                var existing = await _service.GetCourseApplicationsByUserId(userId);
                if (existing == null || !existing.Any())
                {
                    return NotFound("Cannot find any course application.");
                }
                return Ok(existing);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddCourseApplication([FromBody] CourseApplication courseApplication)
        {
            try
            {
                bool isAdded=await _service.AddCourseApplication(courseApplication);
                if(isAdded)
                {
                    return Ok("Course application added successfully.");
                }
                return StatusCode(500,"An error occured while adding the course application.");
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
        [HttpPut("{courseApplicationId}")]
        public async Task<ActionResult> UpdateCourseApplication(int courseApplicationId,[FromBody] CourseApplication courseApplication)
        {
            try
            {
                bool isUpdated=await _service.UpdateCourseApplication(courseApplicationId,courseApplication);
                if(isUpdated)
                {
                    return Ok("Course application updated successfully.");
                }
                return NotFound("Cannot find any course application.");
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
        [HttpDelete("{courseApplicationId}")]
        public async Task<ActionResult> DeleteCourseApplication(int courseApplicationId)
        {
            try
            {
                bool isDeleted=await _service.DeleteCourseApplication(courseApplicationId);
                if(isDeleted)
                {
                    return Ok("Course application deleted successfully.");
                }
                return NotFound("Cannot find any course application.");
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
    }
}