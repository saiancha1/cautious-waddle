using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using AutoMapper;
using System.Collections.Generic;
using cautious_waddle.Helpers;
using cautious_waddle.ViewModels;
using cautious_waddle.Models;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
using Microsoft.AspNetCore.Http;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class CompaniesController : Controller 
    {
        private readonly ICompaniesRepository _companiesRepository;
        private readonly UserManager<AppUser> _userManager;

        private readonly IBlobStorage _blobStorage;

        public CompaniesController(ICompaniesRepository CompaniesRepository, UserManager<AppUser> userManager, IBlobStorage blobStorage)
        {
            _companiesRepository = CompaniesRepository;
            _userManager = userManager;
            _blobStorage = blobStorage;
        }

        [HttpGet("getCompanies")]
        public IActionResult GetCompanies(
            [FromQuery] string businessType = null, [FromQuery] string specialistArea = null,
            [FromQuery] int minSize = 0, [FromQuery] int maxSize = 0, [FromQuery] string search = null) 
        {
            try 
            {
                return Ok(_companiesRepository.GetCompaniesList(businessType, specialistArea, minSize, maxSize, search));
            } 
            catch 
            {
                return BadRequest();
            }
        }

        [HttpGet("getDisapprovedCompanies")]
        [Authorize(Roles="Admin")]
        public IActionResult GetDisapprovedCompanies()
        {
            try
            {
                return Ok(_companiesRepository.GetDisapprovedCompanies());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("getCompany")]
        public IActionResult GetCompany([FromQuery] int id)
        {
            try
            {
                Company company = _companiesRepository.GetCompanyById(id);

                if(company.IsApproved == 1)
                {
                    return Ok(company);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("getMyCompanies")]
        [Authorize]
        public IActionResult GetMyCompanies()
        {
            try
            {
                string UserId = IdentityHelper.GetUserId(HttpContext);
                return Ok(_companiesRepository.GetMyCompanies(UserId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("addCompany")]
        [Authorize]    
        public  IActionResult AddCompany([FromBody]CompaniesViewModel companyViewModel)
        {
            try{

                Company company = Mapper.Map<CompaniesViewModel, Company>(companyViewModel);
                
                company.Users = new List<CompanyUser>();
                CompanyUser user = new CompanyUser();
                    user.Id = IdentityHelper.GetUserId(HttpContext);             
                company.Users.Add(user);

                company.CreationDate = DateTime.Now;
                company.LastUpdate = DateTime.Now;
                company.ReminderDate = DateTime.Now.AddMonths(1);

                _companiesRepository.AddCompany(company);
                
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("addCompanyImage")]
        [Authorize]
        public async  Task<IActionResult> AddCompanyImage(IFormFile file)
        {
            if(file != null)
            {
                   var storageAccount =  _blobStorage.GetStorageAccount();
                   return Ok(await _blobStorage.UploadFileAsync(storageAccount, file, HttpContext));
            }
            return NotFound();
        }       
         [HttpPost("removeCompany")]
         [Authorize(Roles="Admin")]
        public IActionResult RemoveCompany([FromBody]int id)
        {
            try{
                Company company = new Company();
                company = _companiesRepository.GetCompanyById(id);
                
                if(company != null && company.Users != null)
                {
                   if(company.Users.Any(user => user.Id == IdentityHelper.GetUserId(HttpContext)))
                   {
                       _companiesRepository.DeleteCompany(company);
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
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPost("editCompany")]
        [Authorize]       
        public IActionResult EditCompany([FromBody] CompaniesViewModel company)
        {
            try
            {
                if(company.CompanyId.HasValue)
                {
                    List<CompanyUser> users = _companiesRepository.GetUsers(company.CompanyId.Value);

                    if(users.Any(u => u.Id == IdentityHelper.GetUserId(HttpContext)))
                    {
                        _companiesRepository.UpdateCompany(company);
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

        [HttpPost("approveCompany")]
        [Authorize(Roles="Admin")]
        public IActionResult ApproveCompany([FromBody] int id)
        {
            try
            {
                _companiesRepository.approveCompany(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("disapproveCompany")]
        [Authorize(Roles="Admin")]
        public IActionResult DisapproveCompany([FromBody] int id)
        {
            try
            {
                _companiesRepository.disapproveCompany(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }           
    }
}
