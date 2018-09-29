using System;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Hangfire;

using cautious_waddle.Models;
using cautious_waddle.Helpers;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class ScheduledTasksController : Controller
    {
        private IJobsRepository _jobsRepository;
        public ScheduledTasksController(IJobsRepository jobsRepository)
        {
            _jobsRepository = jobsRepository;
        }

        [HttpPost("addExpiredJobs")]
        [Authorize]
        public IActionResult AddExpiredJobs()
        {
            try
            {
                string UserId = IdentityHelper.GetUserId(HttpContext);

                RecurringJob.AddOrUpdate<JobsRepository>(j => j.ExpiredJobs(), Cron.Minutely);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}