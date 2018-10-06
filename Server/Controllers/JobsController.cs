using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

using cautious_waddle.Models;
using cautious_waddle.Helpers;
using cautious_waddle.ViewModels;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class JobsController : Controller
    {
        private readonly IJobsRepository _jobsRespository;
        private readonly ICompaniesRepository _companiesRepository;
        private readonly IProfilesRepository _profilesRepository;

        public JobsController(IJobsRepository JobsRepository, ICompaniesRepository companiesRepository, IProfilesRepository profilesRepository) 
        {
            _jobsRespository = JobsRepository;
            _companiesRepository = companiesRepository;
            _profilesRepository = profilesRepository;
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
                return Ok(_jobsRespository.AdminGetJobs(expired, approved));
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

                job.IsApproved = 0;
                job.Expired = 0;
                job.CreationDate = DateTime.Now;
                job.LastUpdate = DateTime.Now;

                // Ensure the job advertisment runs for atleast 7 days unless it is removed
                if(job.Expiry < DateTime.Now.AddDays(7))
                {
                    return BadRequest();
                }

                if(job.CompanyId.HasValue)
                {
                    Company company = new Company();
                    company = _companiesRepository.GetCompanyById(job.CompanyId.Value);

                    if(company.Users.Any(user => user.Id == IdentityHelper.GetUserId(HttpContext)))
                    {
                        _jobsRespository.AddJob(job);
                        return Ok();
                    }
                    else {
                        return Unauthorized();
                    }
                }
                else if(job.ProfileId.HasValue)
                {
                    // 'Profile' is also a class in AutoMapper, so must use namespace as well.
                    cautious_waddle.Models.Profile profile = new cautious_waddle.Models.Profile();
                    profile = _profilesRepository.GetProfileById(job.ProfileId.Value);

                    if(profile.UserId == IdentityHelper.GetUserId(HttpContext))
                    {
                        _jobsRespository.AddJob(job);
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
                return NotFound(e);
            }
        }

        [HttpPost("removeJob")]
        [Authorize]
        public IActionResult RemoveJob([FromBody] int id) {
            try
            {
                Job job = new Job();
                job = _jobsRespository.GetJobById(id);

                if(job.CompanyId.HasValue)
                {
                    Company company = new Company();
                    company = _companiesRepository.GetCompanyById(job.CompanyId.Value);

                    if(company.Users.Any(user => user.Id == IdentityHelper.GetUserId(HttpContext)))
                    {
                        _jobsRespository.DeleteJob(job);
                        return Ok();
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }
                else if(job.ProfileId.HasValue)
                {
                    cautious_waddle.Models.Profile profile = new cautious_waddle.Models.Profile();
                    profile = _profilesRepository.GetProfileById(job.ProfileId.Value);

                    if(profile.UserId == IdentityHelper.GetUserId(HttpContext))
                    {
                        _jobsRespository.DeleteJob(job);
                        return Ok();
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }
                else {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return NotFound(ex);
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

                    // Ensure expiry is not set to an invalid date
                    if(job.Expiry != originalJob.Expiry && job.Expiry < DateTime.Now)
                    {
                        return BadRequest();
                    }

                    if(originalJob.CompanyId.HasValue)
                    {
                        Company company = new Company();
                        company = _companiesRepository.GetCompanyById(originalJob.CompanyId.Value);

                        if(company.Users.Any(user => user.Id == IdentityHelper.GetUserId(HttpContext)))
                        {
                            _jobsRespository.EditJob(job);
                            return Ok();
                        }
                        else
                        {
                            return Unauthorized();
                        }
                    }
                    else if(originalJob.ProfileId.HasValue)
                    {
                        cautious_waddle.Models.Profile profile = new cautious_waddle.Models.Profile();
                        profile = _profilesRepository.GetProfileById(originalJob.ProfileId.Value);

                        if(profile.UserId == IdentityHelper.GetUserId(HttpContext))
                        {
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
                return NotFound(e);
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
    }
}