using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using System;
using System.Collections.Generic;
using System.Linq;

using MailKit;
using MailKit.Net.Smtp;
using MimeKit;

using cautious_waddle.Models;
using cautious_waddle.ViewModels;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class EmailingController : Controller
    {
        private IEmailService _emailService;
        private JobsDbContext _context2;
        private MailingListDbContext _context;

        public EmailingController(IEmailService emailService, MailingListDbContext context, JobsDbContext context2)
        {
            _emailService = emailService;
            _context = context;
            _context2 = context2;
        }

        [HttpPost("sendBulkEmail")]
        [Authorize(Roles="Admin")]
        public IActionResult SendBulkEmail([FromBody] EmailMessageViewModel emailMessageViewModel)
        {
            try
            {
                MailingList_EmailAddress from = new MailingList_EmailAddress();
                from.FullName = "Mailgun";
                from.EmailAddress = "postmaster@sandboxc33747215c0b494eb6618dd752641b33.mailgun.org";

                EmailMessage emailMessage = new EmailMessage();

                if(emailMessageViewModel.ToAddresses.Count == 0)
                {
                    List<MailingList_EmailAddress> emailAddresses = _context.MailingList.ToList();
                    emailMessage.ToAddresses = emailAddresses;
                }
                else
                {
                    emailMessage.ToAddresses = emailMessageViewModel.ToAddresses;
                }

                emailMessage.FromAddresses.Add(from);
                emailMessage.Subject = emailMessageViewModel.Subject;
                emailMessage.Content = emailMessageViewModel.Content;

                _emailService.Send(emailMessage);

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("sendMailingListWeekly")]
        [Authorize(Roles="Admin")]
        public IActionResult sendMailingListWeekly()
        {
            try
            {
                _emailService.MailingListWeekly();
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("getEmailAddresses")]
        [Authorize(Roles="Admin")]
        public IActionResult getEmailAddresses()
        {
            try
            {
                return Ok(_emailService.GetEmailAddresses());
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}