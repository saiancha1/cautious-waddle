using Microsoft.AspNetCore.Mvc;
using cautious_waddle.Models;
using System.Linq;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class JobsController : Controller
    {
        private readonly IJobsRepository _jobsRespository;

        public JobsController(IJobsRepository JobsRepository) 
        {
            _jobsRespository = JobsRepository;
        }

        [HttpGet("getJobs")]
        public IActionResult getJobs([FromQuery] int minSalary = 0, [FromQuery] int maxSalary = 0, [FromQuery] string search = null)
        {
            try {
                return Ok(_jobsRespository.GetJobsList(minSalary, maxSalary, search));
            } 
            catch
            {
                return NotFound();
            }
        }
    }
}