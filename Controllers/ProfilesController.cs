using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using cautious_waddle.Models;
using cautious_waddle.Helpers;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class ProfilesController : Controller
    {
        private IProfilesRepository _profileRepository;

        public ProfilesController(IProfilesRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        [HttpGet("getProfiles")]
        public IActionResult GetProfiles()
        {
            try
            {
                return Ok(_profileRepository.GetProfiles());
            }
            catch
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost("addProfile")]
        public IActionResult AddProfile([FromBody] Profile profile)
        {
            try
            {
                if(!_profileRepository.UserHasProfile(profile.UserId))
                {
                    if(IdentityHelper.GetUserId(HttpContext) == profile.UserId)
                    {
                        _profileRepository.AddProfile(profile);
                        return Ok();
                    }
                    else
                    {
                        // profile.UserId did not match the current UserId
                        return Unauthorized();
                    }
                }
                else
                {
                    // User already has a profile
                    return NotFound();
                }
            }
            catch
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost("editProfile")]
        public IActionResult EditProfile([FromBody] Profile profile)
        {
            try
            {
                if(profile.UserId == IdentityHelper.GetUserId(HttpContext))
                {
                    // Current user has access to this profile
                    _profileRepository.EditProfile(profile);
                    return Ok();
                }
                else
                {
                    // Current user does not have access to this profile
                    return Unauthorized();
                }
            }
            catch
            {
                return NotFound();
            }
        }
    }
}