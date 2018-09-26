using Microsoft.AspNetCore.Identity;
using System;
namespace cautious_waddle.ViewModels
{
    public class AppUser : IdentityUser
    {
        public string FirstName {get;set;}
        public string LastName {get;set;}
        public string EmailAddress {get;set;}
        public string Id {get; set;}
    }
}