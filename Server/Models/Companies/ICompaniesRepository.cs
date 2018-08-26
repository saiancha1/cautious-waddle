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
    }
}