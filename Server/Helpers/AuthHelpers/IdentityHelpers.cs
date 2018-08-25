using System;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Linq;

namespace cautious_waddle.Helpers
{
    public static class IdentityHelper
    {
        public static bool IsUserLoggedIn(HttpContext context)
        {            
            bool isAuthenticated = !string.IsNullOrEmpty(context.User.Identities.First()
                   .Claims.FirstOrDefault(c => c.Type == "id").Value);   
            return isAuthenticated;
        }

        public static string GetUserId(HttpContext context)
        {
            return context.User.Identities.First().Claims.FirstOrDefault(c => c.Type == "id").Value;
        }
    }
}