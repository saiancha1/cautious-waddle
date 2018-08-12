using System;
using cautious_waddle.ViewModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace cautious_waddle.Models
{
    public class IdentityDbContext : IdentityDbContext<AppUser>
    {
        public IdentityDbContext(DbContextOptions<IdentityDbContext> opts) : base(opts)
        {

        }
    }

    public class CompaniesDbContext : DbContext
    {
        public DbSet<Company> Companies {get; set;}
        public DbSet<CompanyUser> CompanyUsers {get;set;}
        public CompaniesDbContext(DbContextOptions<CompaniesDbContext> opts) : base(opts)
        {

        }
    }
}