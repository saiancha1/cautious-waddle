using cautious_waddle.ViewModels.IdentityValidators;
using FluentValidation.Attributes;

namespace cautious_waddle.ViewModels
{
    [Validator(typeof(CredentiasValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email {get;set;}
        public string FirstName {get;set;}
        public string LastName {get;set;}

        public string PhoneNumber {get;set;}

        public string Role {get;set;}

        public string UserId {get;set;}

    }
}