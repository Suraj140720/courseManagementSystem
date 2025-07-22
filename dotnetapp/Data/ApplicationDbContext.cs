using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }        
        public DbSet<User> Users{get; set;}
        public DbSet<Course> Courses{get; set;}
        public DbSet<CourseApplication> CourseApplications{get; set;}
        public DbSet<Feedback> Feedbacks{get; set;}
        public DbSet<SuperAdmin> superAdmin{get; set;}
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
        
            }
        }
    }
}