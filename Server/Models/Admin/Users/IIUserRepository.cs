using System;
using System.Threading.Tasks;
using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public interface IUserRepository
    {
        Task<AppUser> AddUser (AppUser user, string role, string password);
        void RemoveUser (AppUser user);
        void UpdateUser (AppUser user);
    } 
}