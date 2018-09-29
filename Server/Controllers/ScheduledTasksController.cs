using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

using Hangfire;

using cautious_waddle.Models;
using cautious_waddle.ViewModels;
using cautious_waddle.Helpers;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class ScheduledTasksController : Controller
    {
        private IJobsRepository _jobsRepository;
        private UserManager<AppUser> _userManager;
        public ScheduledTasksController(IJobsRepository jobsRepository, UserManager<AppUser> userManager)
        {
            _jobsRepository = jobsRepository;
            _userManager = userManager;
        }

        public async Task<IList<string>> GetUserRoles(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var roles = await _userManager.GetRolesAsync(user);
            return roles;
        }

        [HttpPost("addExpiredJobs")]
        [Authorize]
        public async Task<IActionResult> AddExpiredJobs()
        {
            try
            {
                string userId = IdentityHelper.GetUserId(HttpContext);
                var roles = await GetUserRoles(userId);

                if(roles[0] == "Admin")
                {
                    RecurringJob.AddOrUpdate<JobsRepository>(j => j.ExpiredJobs(), Cron.Minutely);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}