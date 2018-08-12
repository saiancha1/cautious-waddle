using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace cautious_waddle.Models
{
    public interface ICompaniesRepository
    {
        IEnumerable<Company> GetCompaniesList(string businessType, string specialistArea, int minSize, int maxSize);
    }
}