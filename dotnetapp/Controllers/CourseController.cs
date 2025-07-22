using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    [Authorize]
    public class CourseController : ControllerBase
    {
        private readonly CourseService  _courseService;
        public CourseController(CourseService courseService)
        {
         _courseService=courseService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetAllCourses()
        {
            try{
                var courses=await _courseService.GetAllCourses();
                return Ok(courses);
            }
            catch(Exception ex)
            {
               return StatusCode(500,$"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("{courseId}")]
        public async Task<ActionResult<Course>> GetCourseById(int courseId)
        {
          try
          {
            var course = await _courseService.GetCourseById(courseId);
            if(course==null)
            {
                return NotFound("Cannot find any course");
            }
            else
            {
                return Ok(course);
            }
          }
           catch(Exception ex)
          {
           return StatusCode(500,$"Internal server error: {ex.Message}");
          }
        }
        [HttpPost]
        public async Task<ActionResult> AddCourse([FromBody] Course course)
        {
            try
            {
             
                bool isAdded = await _courseService.AddCourse(course);
                if(isAdded)
             {
                return Ok("Course added successfully");
             }
             else
             {
                return StatusCode(500,"Failed to add course");
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
        [HttpPut("{courseId}")]
        
        public async Task<ActionResult> UpdateCourse(int courseId,[FromBody] Course course)
        {
                try
                {
                   bool isUpdated =await _courseService.UpdateCourse(courseId,course);
                   if(isUpdated)
                   {
                    return Ok(new {msg = "Course updated successfully"});
                   }
                   else{
                    return NotFound(new {msg = "Cannot find any course"});
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
        [HttpDelete("{courseId}")]
        public async Task<ActionResult> DeleteCourse(int courseId)
        {
            try
            {
             bool isDeleted = await _courseService.DeleteCourse(courseId);
             if(isDeleted)
             {
                
                return Ok(new {msg = "Course deleted successfully"});
             }
             else
             {
                return NotFound(new {msg = "Cannot find any course"});

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
   }    
        
}

