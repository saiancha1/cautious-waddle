using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using cautious_waddle.Models;
using cautious_waddle.Helpers;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class ConsultantsController : Controller
    {
        private IConsultantsRepository _consultantsRepository;
        private IProfilesRepository _profilesRepository;
        private ConsultantsDbContext _context;

        public ConsultantsController(IConsultantsRepository consultantsRepository, IProfilesRepository profilesRepository, ConsultantsDbContext context)
        {
            _consultantsRepository = consultantsRepository;
            _profilesRepository = profilesRepository;
            _context = context;
        }

        [HttpGet("getConsultants")]
        public IActionResult GetConsultants()
        {
            try
            {
                return Ok(_consultantsRepository.GetConsultants());
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("addConsultant")]
        [Authorize]
        public IActionResult AddConsultant([FromBody] Consultant consultant)
        {
            try
            {
                consultant.UserId = IdentityHelper.GetUserId(HttpContext);

                consultant.IsApproved = 0;

                consultant.CreationDate = DateTime.Now;
                consultant.LastUpdate = DateTime.Now;
                consultant.ReminderDate = DateTime.Now.AddMonths(1);

                _consultantsRepository.AddConsultant(consultant);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("removeConsultant")]
        [Authorize]
        public IActionResult RemoveConsultant([FromBody] int id)
        {
            try
            {
                Consultant consultant = new Consultant();
                consultant = _consultantsRepository.GetConsultantById(id);

                if(consultant.UserId == IdentityHelper.GetUserId(HttpContext))
                {
                    _consultantsRepository.RemoveConsultant(consultant);
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("editConsultant")]
        [Authorize]
        public IActionResult EditConsultant([FromBody] Consultant consultant)
        {
            try
            {
                if(_consultantsRepository.GetUserId(consultant.ConsultantId.Value) == IdentityHelper.GetUserId(HttpContext))
                {
                    _consultantsRepository.EditConsultant(consultant);
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}