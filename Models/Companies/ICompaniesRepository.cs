using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface ICompaniesRepository
    {
        List<Company> GetAllCompaniesList();
        void AddCompany(Company company);
        void UpdateCompany(Company company);
        void DeleteCompany(Company company);
        Company GetCompanyById (int id);
        IEnumerable<Company> GetCompaniesList(string businessType, string specialistArea, int minSize, int maxSize, string search);
    }
}