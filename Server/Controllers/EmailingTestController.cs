using Microsoft.AspNetCore.Mvc;
using System;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class EmailingTestController : Controller
    {
        [HttpPost("sendEmail")]
        public IActionResult SendEmail()
        {
            try
            {
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}