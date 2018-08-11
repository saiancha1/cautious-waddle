using System.Collections.Generic;
using System.Linq;

namespace cautious_waddle.Models
{
    public class CompaniesRepository : ICompaniesRepository
    {
        private CompaniesDbContext _context;
        public IEnumerable<Company> _companies => _context.Companies;

        public CompaniesRepository(CompaniesDbContext context) {
            _context = context;
        }

        public IEnumerable<Company> GetCompaniesList()
        {
            return _context.Companies;
        }

        public IEnumerable<Company> GetCompaniesList(string filter)
        {
            return _context.Companies.Where(c => c.BusinessType == filter);
        }
    }
}