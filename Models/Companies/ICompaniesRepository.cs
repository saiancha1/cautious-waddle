using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface ICompaniesRepository
    {
        IEnumerable<Company> GetCompaniesList();
        IEnumerable<Company> GetCompaniesList(string filter);
    }
}