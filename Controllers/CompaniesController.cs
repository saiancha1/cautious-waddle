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
        [HttpGet("listCompanies")]
        public IActionResult GetCompanies([FromQuery] string filter = null) {
            try {
                if(filter == null) 
                {
                    return Ok(_companiesRepository.GetCompaniesList());
                } 
                else 
                {
                    // Filter by businessType
                    return Ok(_companiesRepository.GetCompaniesList(filter));
                }
            } catch {
                return NotFound();
            }
        }
    }
}