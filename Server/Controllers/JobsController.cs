using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

using cautious_waddle.Models;
using cautious_waddle.Helpers;
using cautious_waddle.ViewModels;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class JobsController : Controller
    {
        private readonly IJobsRepository _jobsRespository;
        private readonly ICompaniesRepository _companiesRepository;
        private readonly IEmailService _emailService;
        private IBlobStorage _blobStorage;
        public JobsController(IJobsRepository JobsRepository, ICompaniesRepository companiesRepository, IProfilesRepository profilesRepository,
        UserManager<AppUser> UserManager, IEmailService emailService, IBlobStorage blobStorage) 
        {
            _jobsRespository = JobsRepository;
            _companiesRepository = companiesRepository;
            _emailService = emailService;
            _blobStorage = blobStorage;
        }

        [HttpGet("getJobs")]
        public IActionResult getJobs([FromQuery] int minSalary = 0, [FromQuery] int maxSalary = 0, [FromQuery] string search = null)
        {
            try 
            {
                return Ok(_jobsRespository.GetJobsList(minSalary, maxSalary, search));
            } 
            catch(Exception ex)
            {
                return NotFound();
            }
        }

        [HttpGet("adminGetJobs")]
        [Authorize(Roles="Admin")]
        public IActionResult adminGetJobs([FromQuery] bool? expired, [FromQuery] bool? approved)
        {
            try 
            {
                List<JobsViewModel> jobs = _jobsRespository.AdminGetJobs(expired, approved).ToList();
                if (jobs.Count > 0)
                {
                    jobs = jobs.OrderBy(j => j.IsApproved).ToList();
                }
                return Ok(jobs);
            } 
            catch(Exception ex)
            {
                return NotFound();
            }
        }

        [HttpPost("addJob")]
        [Authorize]
        public IActionResult AddJob([FromBody] JobsViewModel jobViewModel) {
            try 
            {
                Job job = Mapper.Map<JobsViewModel, Job>(jobViewModel);
                string UserId = IdentityHelper.GetUserId(HttpContext);

                job.IsApproved = 0;
                job.Expired = 0;
                job.UserId = UserId;
                job.CreationDate = DateTime.Now;
                job.LastUpdate = DateTime.Now;

                // Ensure the job advertisment runs for atleast 7 days unless it is removed
                if(job.Expiry < DateTime.Now.AddDays(7))
                {
                    return BadRequest();
                }

                // If a companyId is passed, ensure the company exists and the user has access to it
                if(job.CompanyId.HasValue)
                {
                    Company company = _companiesRepository.GetCompanyById(job.CompanyId.Value);
                    if(company == null)
                    {
                        return BadRequest();
                    }
                    else
                    {
                        if(company.Users.Any(user => user.Id == UserId) == false)
                        {
                            return Unauthorized();
                        }
                    }
                }

                _jobsRespository.AddJob(job);

                string content = "A new job listing has been added\n" + 
                "\nID: " + job.JobId + 
                "\nTitle: " + job.JobTitle + 
                "\n\nPlease go to https://capstone1.azurewebsites.net/admin to approve this job listing";
                string subject = "New job listing";

                _emailService.SendToAdmins(subject, content);
                return Ok();
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpPost("removeJob")]
        [Authorize]
        public async System.Threading.Tasks.Task<IActionResult> RemoveJobAsync([FromBody] int id) {
            try
            {
                Job job = new Job();
                job = _jobsRespository.GetJobById(id);
                string UserId = IdentityHelper.GetUserId(HttpContext);

                if(job.UserId == UserId)
                {
                    _jobsRespository.DeleteJob(job);
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("editJob")]
        [Authorize]
        public IActionResult EditJob([FromBody] JobsViewModel job)
        {
            try 
            {
                if(job.JobId.HasValue)
                {
                    Job originalJob = _jobsRespository.GetJobById(job.JobId.Value);
                    string UserId = IdentityHelper.GetUserId(HttpContext);

                    if(originalJob.UserId == UserId)
                    {
                        // Ensure expiry is not set to an invalid date
                        if(job.Expiry != originalJob.Expiry && job.Expiry < DateTime.Now)
                        {
                            return BadRequest();
                        }
                    
                        _jobsRespository.EditJob(job);
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
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost("approveJob")]
        [Authorize(Roles="Admin")]
        public IActionResult ApproveJob([FromBody] int id)
        {
            try
            {
                _jobsRespository.approveJob(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("disapproveJob")]
        [Authorize(Roles="Admin")]
        public IActionResult DisapproveJob([FromBody] int id)
        {
            try
            {
                _jobsRespository.disapproveJob(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("addJobImage")]
        [Authorize]
        public async  Task<IActionResult> AddJobImage(IFormFile file)
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