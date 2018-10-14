using System.Collections.Generic;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public interface ICompaniesRepository
    {
        void AddCompany(Company company);
        void UpdateCompany(CompaniesViewModel company);
        void DeleteCompany(Company company);
        Company GetCompanyById (int id);
        List<CompanyUser> GetUsers(int id);
        IEnumerable<CompaniesViewModel> GetCompaniesList(string businessType, string specialistArea, int minSize, int maxSize, string search);
        IEnumerable<Company> GetDisapprovedCompanies();
        IEnumerable<Company> AdminGetCompanies(bool? approved);
        IEnumerable<Company> GetMyCompanies(string userId, bool? approved);
        void approveCompany(int id);
        void disapproveCompany(int id);
    }
}