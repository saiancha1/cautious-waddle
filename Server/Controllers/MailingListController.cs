using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using System;

using cautious_waddle.Models;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class MailingListController : Controller
    {
        private readonly IMailingListRepository _mailingListRepository;
        private readonly IEmailService _emailService;

        public MailingListController(IMailingListRepository mailingListRepository, IEmailService emailService)
        {
            _mailingListRepository = mailingListRepository;
            _emailService = emailService;
        }

        [HttpPost("subscribe")]
        public IActionResult subscribe([FromBody] MailingList_EmailAddress emailAddress)
        {
            try
            {
                _mailingListRepository.subscribe(emailAddress);
                return Ok();
            }
            catch
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
                _mailingListRepository.MailingListWeekly();
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("getMailingList")]
        [Authorize(Roles="Admin")]
        public IActionResult getMailingList()
        {
            try
            {
                return Ok(_mailingListRepository.getMailingList());
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}