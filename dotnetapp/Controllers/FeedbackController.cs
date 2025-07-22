using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Exceptions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    [Authorize]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _services;

        public FeedbackController(FeedbackService services){
            _services=services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks(){
            try{
                var feedbacks=await _services.GetAllFeedbacks();
                return Ok(feedbacks);
            }catch(Exception ex){
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbackByUserId(int userId){
            try{
                var feedbacks=await _services.GetFeedbacksByUserId(userId);
                if(feedbacks==null || !feedbacks.Any()){
                    return NotFound();
                }
                return Ok(feedbacks);
            }catch (Exception ex){
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback){
            try{
                var success=await _services.AddFeedback(feedback);
                
                if(success){
                    return Ok("Feedback added successfully.");
                }
                return StatusCode(500,"An error occured while adding feedbacks.");
            }
            catch (Exception ex){
                return StatusCode(500, ex.Message);
            }
            
        }

        [HttpDelete("{feedbackId}")]
        public async Task<ActionResult> DeleteFeedback(int feedbackId){
            try{
                var success=await _services.DeleteFeedback(feedbackId);
                if(success){
                    return Ok("Feedback deleted successfully.");
                }
                return NotFound("Cannot find any feedback.");
            }catch(Exception ex){
                return StatusCode(500, ex.Message);
            }
        }
    }
}
