using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class SuperAdmin
    {
        [Key]
        public int id {get; set;}
        public string Email {get; set;}
        public string Password {get; set;}
        public string Username {get; set;}
        public string MobileNumber {get; set;}
        public string UserRole {get; set;}
        public string? Status {get; set;}
    }
}