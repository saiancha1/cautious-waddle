using System;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using AutoMapper;

using cautious_waddle.Models;
using cautious_waddle.Helpers;
using cautious_waddle.ViewModels;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class ConsultantsController : Controller
    {
        private IConsultantsRepository _consultantsRepository;
        private IProfilesRepository _profilesRepository;
        private ConsultantsDbContext _context;

        private IBlobStorage _blobStorage;

        public ConsultantsController(IConsultantsRepository consultantsRepository, IProfilesRepository profilesRepository, ConsultantsDbContext context,
        IBlobStorage blobStorage)
        {
            _consultantsRepository = consultantsRepository;
            _profilesRepository = profilesRepository;
            _context = context;
            _blobStorage = blobStorage;
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

        [HttpGet("getDisapprovedConsultants")]
        [Authorize(Roles="Admin")]
        public IActionResult GetDisapprovedConsultants()
        {
            try
            {
                return Ok(_consultantsRepository.GetDisapprovedConsultants());
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("addConsultant")]
        [Authorize]
        public IActionResult AddConsultant([FromBody] ConsultantsViewModel consultantViewModel)
        {
            try
            {
                var userId = IdentityHelper.GetUserId(HttpContext);

                if(_profilesRepository.IsProfileConsultant(userId) == false)
                {
                    Consultant consultant = Mapper.Map<ConsultantsViewModel, Consultant>(consultantViewModel);

                    consultant.UserId = userId;
                    consultant.IsApproved = 0;
                    consultant.CreationDate = DateTime.Now;
                    consultant.LastUpdate = DateTime.Now;
                    consultant.ReminderDate = DateTime.Now.AddMonths(1);

                    _consultantsRepository.AddConsultant(consultant, userId);

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

        [HttpPost("removeConsultant")]
        [Authorize]
        public IActionResult RemoveConsultant([FromBody] int id)
        {
            try
            {
                string userId = IdentityHelper.GetUserId(HttpContext);
                Consultant consultant = new Consultant();
                consultant = _consultantsRepository.GetConsultantById(id);

                if(consultant.UserId == userId)
                {
                    _consultantsRepository.RemoveConsultant(consultant, userId);
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
        public IActionResult EditConsultant([FromBody] ConsultantsViewModel consultant)
        {
            try
            {
                if(consultant.ConsultantId.HasValue)
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

        [HttpPost("approveConsultant")]
        [Authorize(Roles="Admin")]
        public IActionResult ApproveConsultant([FromBody] int id)
        {
            try
            {
                _consultantsRepository.ApproveConsultant(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("disapproveConsultant")]
        [Authorize(Roles="Admin")]
        public IActionResult DisapproveConsultant([FromBody] int id)
        {
            try
            {
                _consultantsRepository.DisapproveConsultant(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

         [HttpPost("addConsultantImage")]
        [Authorize]
        public async  Task<IActionResult> AddConsultantImage(IFormFile file)
        {
            if(file != null)
            {
                   var storageAccount =  _blobStorage.GetStorageAccount();
                   return Ok(await _blobStorage.UploadFileAsync(storageAccount, file, HttpContext));
            }
            return NotFound();
        }       
    }
}