using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using cautious_waddle.Auth;
using cautious_waddle.Helpers;
using cautious_waddle.Models;
using cautious_waddle.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly IProfilesRepository _profileRepo;
        private readonly ICompaniesRepository _companiesRepository;
        private readonly IConsultantsRepository _consultantsRepository;
        private readonly IJobsRepository _jobsRepository;
        private readonly ILocalEventsRepository _localEventsRepository;
        public AuthController(UserManager<AppUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions,
        IProfilesRepository profileRepo, ICompaniesRepository companiesRepository, IConsultantsRepository consultantsRepository,
        IJobsRepository jobsRepository, ILocalEventsRepository localEventsRepository)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _profileRepo = profileRepo;
            _companiesRepository = companiesRepository;
            _consultantsRepository = consultantsRepository;
            _jobsRepository = jobsRepository;
            _localEventsRepository = localEventsRepository;
            _jobsRepository = jobsRepository;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

          var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.UserName, _jwtOptions, 
            new JsonSerializerSettings { Formatting = Formatting.Indented });
          
          return new OkObjectResult(jwt);
        }
        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByEmailAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                var roles = await _userManager.GetRolesAsync(userToVerify);
                ClaimsIdentity claimsIdentity = await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
                claimsIdentity.AddClaims(roles.Select(role => new Claim(ClaimTypes.Role, role)));
                return claimsIdentity;
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser([FromBody]CredentialsViewModel userViewModel, bool isAdmin = false, string role ="User")
        {
            AppUser user  = new AppUser{
                UserName = userViewModel.UserName,
                Email = userViewModel.Email,
                FirstName = userViewModel.FirstName,
                LastName = userViewModel.LastName,
                PhoneNumber = userViewModel.PhoneNumber
            };
            if(userViewModel.Role == "Admin" && !isAdmin)
            {
                return NotFound();
            }
            if(userViewModel.Role == null)
            {
                userViewModel.Role = "User";
            }
            var currentUser = await _userManager.FindByEmailAsync(user.Email);
            try 
            {
            if(currentUser == null)
            {
                var createUser = await _userManager.CreateAsync(user, userViewModel.Password);
                if (createUser.Succeeded)
                {
                    role = (isAdmin) ? "Admin" : userViewModel.Role;
                    await _userManager.AddToRoleAsync(user,role);
                    string uId = user.Id;
                    Profile profile = new Profile {
                        UserId = uId,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Bio = ""
                    };
                    _profileRepo.AddProfile(profile);
                    return Ok();
                }                  
            }
            return NotFound();
            }
            catch {
                return NotFound();
            }
            
        }
        
        [HttpPost("UpdateUser")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> UpdateUser([FromBody]AppUser viewModel)
        {
            
            AppUser user = await _userManager.FindByIdAsync(viewModel.Id);
            UserResponse resp = new UserResponse();
            if(user != null)
            {
                user.PhoneNumber = viewModel.PhoneNumber;
                user.Email = viewModel.Email;
                user.UserName = viewModel.UserName;
                user.FirstName = viewModel.FirstName;
                user.LastName = viewModel.LastName;
                var updatedUser = await _userManager.UpdateAsync(user);
                if(updatedUser.Succeeded)
                {
                    resp.Result = "User Added Successfully";
                    return Ok(resp);
                }
                else{
                    resp.Result = "Failed";
                    return NotFound(resp);
                }
            }
            return NotFound(resp);
            
            
        }

        [HttpGet("GetUsers")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> GetUsers()
        {
            List<AppUser> users = new List<AppUser>();
            IQueryable<AppUser> users1 = _userManager.Users;
            users = users1.ToList();
            return Ok(users);
        }

        [HttpGet("isAdmin")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> CheckUserAdmin()
        {
            return Ok();
        }
        [HttpGet("DeleteUser")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> DeleteUser([FromQuery]string Id)
        {
            
            try 
            {
                // Delete all of the users listings first
                _companiesRepository.DeleteMyCompanies(Id);
                _consultantsRepository.DeleteMyConsultants(Id);
                _jobsRepository.DeleteMyJobs(Id);
                _localEventsRepository.DeleteMyEvents(Id);

                // Delete the profile
                _profileRepo.DeleteProfile(_profileRepo.GetProfileByUserId(Id));

                // Now delete the user
                AppUser user = await _userManager.FindByIdAsync(Id);
                var isDeleted = await _userManager.DeleteAsync(user);
                if(isDeleted.Succeeded)
                {
                    return Ok();
                }
                else 
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        
    }          
}