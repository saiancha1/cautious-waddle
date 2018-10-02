using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

using MailKit;
using MailKit.Net.Smtp;
using MimeKit;

using cautious_waddle.Models;
using cautious_waddle.ViewModels;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class EmailingTestController : Controller
    {
        private IEmailService _emailService;

        public EmailingTestController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("sendEmail")]
        public IActionResult SendEmail([FromBody] EmailMessageViewModel emailMessageViewModel)
        {
            try
            {
                MailingList_EmailAddress from = new MailingList_EmailAddress();
                from.FullName = "Mailgun";
                from.EmailAddress = "postmaster@sandboxc33747215c0b494eb6618dd752641b33.mailgun.org";

                EmailMessage emailMessage = new EmailMessage();
                emailMessage.ToAddresses = emailMessageViewModel.ToAddresses;
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