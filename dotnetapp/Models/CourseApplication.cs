using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace dotnetapp.Models
{
    public class CourseApplication
    {
        [Key]
        public int CourseApplicationId {get;set;}
        public int UserId {get;set;}
        [JsonIgnore]
        [ForeignKey("UserId")]
        public User? User {get; set;}
        public int CourseId {get; set;}
        [JsonIgnore]
        [ForeignKey("CourseId")]
        public Course? Course {get; set;}
        public string ApplicationDate {get; set;}
        public string Status {get; set;}
        public string Skills {get; set;}
        public string EducationLevel {get; set;}
        public string ExperienceDetails {get; set;}
        public string? AdditionalNotes {get; set;}
    }
}