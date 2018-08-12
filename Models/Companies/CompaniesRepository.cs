using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;

namespace cautious_waddle.Models
{
    public class CompaniesRepository : ICompaniesRepository
    {
        private CompaniesDbContext _context;
        public IEnumerable<Company> _companies => _context.Companies;

        public CompaniesRepository(CompaniesDbContext context) {
            _context = context;
        }

        public IEnumerable<Company> GetCompaniesList(string businessType, string specialistArea, int minSize, int maxSize)
        {
            IEnumerable<Company> companies = _companies;

            if(businessType != null) {
                companies = companies.Where(c => c.BusinessType == businessType);
            }
            if(specialistArea != null) {
                companies = companies.Where(c => c.SpecialistArea == specialistArea);
            }
            companies = companies.Where(c => c.Size >= minSize);
            if(maxSize != 0 && maxSize >= minSize) {
                companies = companies.Where(c => c.Size <= maxSize);
            }

            return companies;
        }
    }
}