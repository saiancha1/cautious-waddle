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

    public class ListingsDbContext : DbContext
    {
        public DbSet<Listing> Listings { get; set; }
        public ListingsDbContext(DbContextOptions<ListingsDbContext> opts) : base(opts)
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

    public class JobsDbContext : DbContext
    {
        public DbSet<Job> Jobs { get; set; }
        public JobsDbContext(DbContextOptions<JobsDbContext> opts) : base(opts)
        {

        }
    }

    public class ProfilesDbContext : DbContext
    {
        public DbSet<Profile> Profiles { get; set; }
        public ProfilesDbContext(DbContextOptions<ProfilesDbContext> opts) : base(opts)
        {
            
        }
    }
}