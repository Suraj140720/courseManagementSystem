using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId {get;set;}
        public int UserId{get;set;}
        [JsonIgnore]
        [ForeignKey("UserId")]
        public User? User {get; set;}
        public string FeedbackText {get; set;}
        public DateTime Date {get; set;}
    }
}