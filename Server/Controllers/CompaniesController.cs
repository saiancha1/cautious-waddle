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
        private readonly IEmailService _emailService;

        private readonly IBlobStorage _blobStorage;

        public CompaniesController(ICompaniesRepository CompaniesRepository, IEmailService emailService, IBlobStorage blobStorage)
        {
            _companiesRepository = CompaniesRepository;
            _emailService = emailService;
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

        [HttpGet("adminGetCompanies")]
        [Authorize(Roles="Admin")]
        public IActionResult AdminGetCompanies([FromQuery] bool? approved)
        {
            try
            {
                return Ok(_companiesRepository.AdminGetCompanies(approved));
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
                CompaniesViewModel company = _companiesRepository.GetCompanyById_viewModel(id);

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
        public IActionResult GetMyCompanies([FromQuery] bool? approved)
        {
            try
            {
                string UserId = IdentityHelper.GetUserId(HttpContext);
                return Ok(_companiesRepository.GetMyCompanies(UserId, approved));
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
                
                company.UserId = IdentityHelper.GetUserId(HttpContext);

                company.CreationDate = DateTime.Now;
                company.LastUpdate = DateTime.Now;
                company.ReminderDate = DateTime.Now.AddMonths(1);

                _companiesRepository.AddCompany(company);

                string content = "A new company listing has been added\n" + 
                "\nID: " + company.CompanyId + 
                "\nCompany name: " + company.CompanyName + 
                "\n\nPlease go to https://capstone1.azurewebsites.net/admin to approve this company listing";
                string subject = "New company listing";

                _emailService.SendToAdmins(subject, content);
                
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
        [Authorize]
        public IActionResult RemoveCompany([FromBody]int id)
        {
            try
            {
                Company company = new Company();
                company = _companiesRepository.GetCompanyById_model(id);
                
                if(company != null && company.UserId != null)
                {
                   if(company.UserId == IdentityHelper.GetUserId(HttpContext))
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

        [HttpPost("adminRemoveCompany")]
        [Authorize(Roles="Admin")]
        public IActionResult AdminRemoveCompany([FromBody]int id)
        {
            try
            {
                Company company = new Company();
                company = _companiesRepository.GetCompanyById_model(id);
                _companiesRepository.DeleteCompany(company);
                return Ok();
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
                    if(company.UserId == IdentityHelper.GetUserId(HttpContext))
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
