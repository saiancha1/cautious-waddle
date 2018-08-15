using System;
using System.Threading.Tasks;
using cautious_waddle.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace cautious_waddle.Models
{
    public class UserRepository : IUserRepository
    {
        private UserManager<AppUser> _userManager;
        private RoleManager<AppUser> _roleManager;

        public UserRepository (UserManager<AppUser> userManager, RoleManager<AppUser> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<AppUser> AddUser(AppUser user, string role, string password)
        {
            var currentUser =  _userManager.FindByEmailAsync(user.Email);
            if (currentUser == null)
            {
                var createUser =  await _userManager.CreateAsync(user, password);
                if (createUser.Succeeded)
                    await _userManager.AddToRoleAsync(user, role);
                return user;
            }
            else
            {
                return await currentUser;
            }
        }

        public void RemoveUser(AppUser user)
        {
            throw new NotImplementedException();
        }

        public void UpdateUser(AppUser user)
        {
            throw new NotImplementedException();
        }
    }
}