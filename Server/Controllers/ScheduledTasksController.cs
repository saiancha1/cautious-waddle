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
        private ILocalEventsRepository _localEventsRepository;
        private IEmailService _emailService;
        public ScheduledTasksController(IJobsRepository jobsRepository, IEmailService emailService, ILocalEventsRepository localEventsRepository)
        {
            _jobsRepository = jobsRepository;
            _emailService = emailService;
            _localEventsRepository = localEventsRepository;
        }

        [HttpPost("addExpiredJobs")]
        [Authorize(Roles="Admin")]
        public IActionResult AddExpiredJobs(string CronExpression = "* * * * *")
        {
            try
            {
                RecurringJob.AddOrUpdate<JobsRepository>(j => j.ExpiredJobs(), CronExpression);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("addMailingList")]
        [Authorize(Roles="Admin")]
        public IActionResult addMailingList([FromBody] string CronExpression = "0 18 * * FRI")
        {
            try
            {
                RecurringJob.AddOrUpdate<MailingListRepository>(e => e.MailingListWeekly(), CronExpression);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("addExpiredEvents")]
        [Authorize(Roles="Admin")]
        public IActionResult addExpiredEvents(string CronExpression = "* * * * *")
        {
            try
            {
                RecurringJob.AddOrUpdate<LocalEventsRepository>(e => e.expireEvents(), CronExpression);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}