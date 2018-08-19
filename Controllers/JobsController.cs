using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using Microsoft.AspNetCore.Authorization;

using cautious_waddle.Models;
using cautious_waddle.Helpers;

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
            catch
            {
                return NotFound();
            }
        }

        [HttpPost("addJob")]
        [Authorize]
        public IActionResult AddJob([FromBody] Job job) {
            try 
            {
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
                    Profile profile = new Profile();
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
                    return NotFound();
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
                    Profile profile = new Profile();
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
        public IActionResult EditJob([FromBody] Job job)
        {
            try 
            {
                if(job.CompanyId.HasValue)
                {
                    Company company = new Company();
                    company = _companiesRepository.GetCompanyById(job.CompanyId.Value);

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
                else if(job.ProfileId.HasValue)
                {
                    Profile profile = new Profile();
                    profile = _profilesRepository.GetProfileById(job.ProfileId.Value);

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
            catch (Exception e)
            {
                return NotFound(e);
            }
        }
    }
}