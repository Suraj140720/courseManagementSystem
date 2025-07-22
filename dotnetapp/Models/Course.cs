using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Course
    {
        [Key]
        public int CourseId {get; set;}
        public string CourseName {get; set;}
        public string Description {get; set;}
        public string InstructorName {get; set;}
        public int DurationInHours {get; set;}
        public decimal Price {get; set;}
        public string CourseContent {get; set;}
        public bool IsAvailable {get; set;}
    }
}