using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Exceptions;
namespace dotnetapp.Services
{
    public class CourseApplicationService
    {
        private readonly ApplicationDbContext _context;
        public CourseApplicationService(ApplicationDbContext context)
        {
            _context=context;
        }
        public async Task<IEnumerable<CourseApplication>> GetAllCourseApplications()
        {
            return await _context.CourseApplications.ToListAsync();
        }
        public async Task<IEnumerable<CourseApplication>> GetCourseApplicationsByUserId(int userId)
        {
            return await _context.CourseApplications.Where(p => p.UserId == userId).ToListAsync();
        }
        public async Task<bool> AddCourseApplication(CourseApplication courseApplication)
        {
            var existingCourseApplication=await _context.CourseApplications.FirstOrDefaultAsync(p=>p.UserId==courseApplication.UserId && p.CourseId==courseApplication.CourseId);
            if(existingCourseApplication!=null)
            {
                throw new CourseException("User already applied for this course");
            }
            _context.CourseApplications.Add(courseApplication);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateCourseApplication(int courseApplicationId,CourseApplication courseApplication)
        {
            var existingCourseApplication=await _context.CourseApplications.FirstOrDefaultAsync(p=>p.CourseApplicationId==courseApplicationId);
            if(existingCourseApplication==null)
            {
                return false;
            }
            existingCourseApplication.UserId=courseApplication.UserId;
            existingCourseApplication.CourseId=courseApplication.CourseId;
            existingCourseApplication.ApplicationDate=courseApplication.ApplicationDate;
            existingCourseApplication.Status=courseApplication.Status;
            existingCourseApplication.Skills=courseApplication.Skills;
            existingCourseApplication.EducationLevel=courseApplication.EducationLevel;
            existingCourseApplication.ExperienceDetails=courseApplication.ExperienceDetails;
            existingCourseApplication.AdditionalNotes=courseApplication.AdditionalNotes;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteCourseApplication(int courseApplicationId)
        {
             var existingCourseApplication=await _context.CourseApplications.FirstOrDefaultAsync(p=>p.CourseApplicationId==courseApplicationId);
            if(existingCourseApplication==null)
            {
                return false;
            }
            _context.CourseApplications.Remove(existingCourseApplication);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}