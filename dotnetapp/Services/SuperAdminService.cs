using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public class SuperAdminService
    {
        private readonly ApplicationDbContext _context;

        public SuperAdminService(ApplicationDbContext context){
            _context=context;
        }

        public async Task<IEnumerable<SuperAdmin>> GetAllAdmins(){
            return  _context.superAdmin.ToList();
        }

        public async Task<bool> AddAdmin(SuperAdmin admin)
        {
            await _context.superAdmin.AddAsync(admin);
            await _context.SaveChangesAsync(); 
            return true;
        }
        public async Task<bool> UpdateAdminStatus(int id, SuperAdmin userA)
        {
            var user = await _context.superAdmin.FindAsync(id);
            if(user == null)
            {
                return false;
            }

            user.Status = userA.Status; 

            await _context.SaveChangesAsync(); 
            return true;
        }

        public async Task<bool> DeleteAdmin(int id){
            var admin=await _context.superAdmin.FindAsync(id);
            if(admin==null){
                return false;
            }

            _context.superAdmin.Remove(admin);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<SuperAdmin>> GetAdminReqById(string email){
            return _context.superAdmin.Where(f=>f.Email==email).ToList();
        }
    }
}