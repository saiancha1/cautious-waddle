using Microsoft.AspNetCore.Mvc;
using cautious_waddle.Models;

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
        public IActionResult GetCompanies() {
            try {
                return Ok(_companiesRepository.GetCompaniesList());
            } catch {
                return NotFound();
            }
        }
    }
}