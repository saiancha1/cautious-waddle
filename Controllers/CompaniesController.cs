using Microsoft.AspNetCore.Mvc;
using cautious_waddle.Models;
using System;
using Microsoft.AspNetCore.Identity;
using cautious_waddle.ViewModels;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class CompaniesController : Controller 
    {
        private readonly ICompaniesRepository _companiesRepository;
        private readonly UserManager<AppUser> _userManager;
        public CompaniesController(ICompaniesRepository CompaniesRepository, UserManager<AppUser> userManager)
        {
            _companiesRepository = CompaniesRepository;
            _userManager = userManager;
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
                return NotFound();
            }
        }
        [HttpPost("addCompany")]
        public IActionResult AddCompany([FromBody]Company company)
        {
            try{
                
                CompanyUser user = new CompanyUser();
                    user.Id = HttpContext.User.Identities.First()
                   .Claims.FirstOrDefault(c => c.Type == "id").Value;             
                company.Users.Add(user);
                _companiesRepository.AddCompany(company);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }       
         [HttpPost("removeCompany")]
         [Authorize]
        public IActionResult RemoveCompany([FromBody]int id)
        {
            try{
                Company company = new Company();
                company = _companiesRepository.GetCompanyById(id);
                
                if(company != null && company.Users != null)
                {
                   if(company.Users.Any(user => user.Id ==  HttpContext.User.Identities.First()
                   .Claims.FirstOrDefault(c => c.Type == "id").Value))
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
                    return NotFound();
                }       
                
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }       
    }
}