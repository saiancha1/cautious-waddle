using System.Collections.Generic;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public interface ICompaniesRepository
    {
        void AddCompany(Company company);
        void UpdateCompany(CompaniesViewModel company);
        void DeleteCompany(Company company);
        CompaniesViewModel GetCompanyById_viewModel(int id);
        Company GetCompanyById_model(int id);
        IEnumerable<CompaniesViewModel> GetCompaniesList(string businessType, string specialistArea, int minSize, int maxSize, string search);
        IEnumerable<CompaniesViewModel> AdminGetCompanies(bool? approved);
        IEnumerable<CompaniesViewModel> GetMyCompanies(string userId, bool? approved);
        void approveCompany(int id);
        void disapproveCompany(int id);
    }
}