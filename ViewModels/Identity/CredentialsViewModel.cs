using cautious_waddle.ViewModels.IdentityValidators;
using FluentValidation.Attributes;

namespace cautious_waddle.ViewModels
{
    [Validator(typeof(CredentiasValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}