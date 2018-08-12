using Microsoft.AspNetCore.Mvc;
using cautious_waddle.Models;
using System.Linq;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class CompaniesController : Controller 
    {
        private readonly ICompaniesRepository _companiesRepository;

        public CompaniesController(ICompaniesRepository CompaniesRepository)
        {
            _companiesRepository = CompaniesRepository;
        }

        [HttpGet("getCompanies")]
        public IActionResult GetCompanies([FromQuery] string businessType = null, [FromQuery] string specialistArea = null,
        [FromQuery] int minSize = 0, [FromQuery] int maxSize = 0) 
        {
            try 
            {
                return Ok(_companiesRepository.GetCompaniesList(businessType, specialistArea, minSize, maxSize));
            } 
            catch 
            {
                return NotFound();
            }
        }
    }
}