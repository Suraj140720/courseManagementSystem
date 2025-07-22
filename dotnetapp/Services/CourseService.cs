using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;
using System.Runtime.CompilerServices;

namespace dotnetapp.Services
{
    public class CourseService
    {
        private readonly ApplicationDbContext _context;

        public CourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Course>> GetAllCourses()
        {
            return await _context.Courses.ToListAsync();
        }
        

        public async Task<Course> GetCourseById(int courseId)
        {
            return await _context.Courses.FindAsync(courseId);
        }

        public async Task<bool> AddCourse(Course course)
        {
            if(await _context.Courses.AnyAsync(c => c.CourseName == course.CourseName))
            {
                throw new CourseException("Course with the same name already exists");
            }

            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync(); 
            return true;
        }

        public async Task<bool> UpdateCourse(int courseId, Course course)
        {
            var existingCourse = await _context.Courses.FindAsync(courseId);
            if(existingCourse == null)
            {
                return false;
            }

            if(await _context.Courses.AnyAsync(c => c.CourseName == course.CourseName && c.CourseId != courseId))
            {
                throw new CourseException("Course with the same name already exists");
            }

            existingCourse.CourseName = course.CourseName;
            existingCourse.Description = course.Description;
            existingCourse.InstructorName = course.InstructorName;
            existingCourse.DurationInHours = course.DurationInHours;
            existingCourse.Price = course.Price;
            existingCourse.CourseContent = course.CourseContent;
            existingCourse.IsAvailable = course.IsAvailable;

            await _context.SaveChangesAsync(); 
            return true;
        }

        public async Task<bool> DeleteCourse(int courseId)
        {
            var course = await _context.Courses.FindAsync(courseId);

            if(course == null)
            {
                return false;
            }

            if(await _context.CourseApplications.AnyAsync(ca => ca.CourseId == courseId))
            {
                throw new CourseException("Course cannot be deleted, it is referenced in courseApplication");
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync(); 
            return true;
        }
    }
}