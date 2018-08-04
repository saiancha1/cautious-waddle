using FluentValidation;
 
namespace cautious_waddle.ViewModels.IdentityValidators
{
    public class CredentiasValidator : AbstractValidator<CredentialsViewModel>
    {
        public CredentiasValidator()
        {
            RuleFor(vm => vm.UserName).NotEmpty().WithMessage("Username cannot be empty");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Password cannot be empty");
            RuleFor(vm => vm.Password.Length).GreaterThan(6).WithMessage("Password must be greater than 6 characters");
        }
    }
}