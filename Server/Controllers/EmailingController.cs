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
        private MailingListDbContext _context;
        private IEmailConfiguration _emailConfiguration;

        public EmailingController(IEmailService emailService, MailingListDbContext context, IEmailConfiguration emailConfiguration)
        {
            _emailService = emailService;
            _context = context;
            _emailConfiguration = emailConfiguration;
        }

        [HttpPost("sendBulkEmail")]
        [Authorize(Roles="Admin")]
        public IActionResult SendBulkEmail([FromBody] EmailMessageViewModel emailMessageViewModel)
        {
            try
            {
                Emailing_EmailAddress from = new Emailing_EmailAddress();
                from.FullName = "Admin@TechPalmy.com";
                from.EmailAddress = _emailConfiguration.SmtpUsername;

                EmailMessage emailMessage = new EmailMessage();

                if(emailMessageViewModel.ToAddresses.Count == 0)
                {
                    List<Emailing_EmailAddress> emailAddresses = _context.MailingList.ToList();
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

        [HttpPost("sendContactForm")]
        public IActionResult sendContactForm([FromBody] ContactFormViewModel contactForm)
        {
            try
            {
                string subject = "Contact form message";
                string content = "From: " + contactForm.FirstName + " " + contactForm.LastName 
                + "\nAt: " + contactForm.EmailAddress
                + "Message: " + "\n" + contactForm.Message;

                _emailService.SendToAdmins(subject, content);

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}