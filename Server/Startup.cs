using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using cautious_waddle.Models;
using cautious_waddle.ViewModels;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using cautious_waddle.Helpers;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using cautious_waddle.Auth;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.AspNetCore.Http;
using AutoMapper;
using FluentValidation.AspNetCore;

namespace cautious_waddle
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            _hostingEnv = env;
        }

        public IConfiguration Configuration { get; }
        private readonly IHostingEnvironment _hostingEnv;
        private const string SecretKey = "C5AFAC84CBE5CBCEE7A3CFA558775";
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddNodeServices(options =>
            {
                options.ProjectPath = "../ClientApp";
            });     
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "../ClientApp/build";
            });
            Console.WriteLine(Configuration["ConnectionStrings:IdentityConnectionString"]);
            services.AddDbContext<IdentityDbContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:IdentityConnectionString"]));
            services.AddDbContext<CompaniesDbContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:IdentityConnectionString"]));
            services.AddTransient<ICompaniesRepository, CompaniesRepository>();
            services.AddDbContext<ConsultantsDbContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:IdentityConnectionString"]));
            services.AddTransient<IConsultantsRepository, ConsultantsRepository>();
            services.AddDbContext<JobsDbContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:IdentityConnectionString"]));
            services.AddTransient<IJobsRepository, JobsRepository>();
            services.AddDbContext<ProfilesDbContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:IdentityConnectionString"]));
            services.AddTransient<IProfilesRepository, ProfilesRepository>();
            
            services.AddSingleton<IJwtFactory, JwtFactory>();
            services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddAutoMapper(typeof(Startup));
            services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<IdentityDbContext>();


            services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());
           
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
             string audience = jwtAppSettingOptions["LocalAudience"];
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = (_hostingEnv.IsDevelopment())? jwtAppSettingOptions["LocalIssuer"] :jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = (_hostingEnv.IsDevelopment())? jwtAppSettingOptions["LocalAudience"] : jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];            
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
                audience = options.Audience;
            });
            
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = (_hostingEnv.IsDevelopment())? jwtAppSettingOptions["LocalIssuer"] 
                    : jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = (_hostingEnv.IsDevelopment())? jwtAppSettingOptions["LocalAudience"] 
                    : jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
            });

            var builder = services.AddIdentityCore<AppUser>(o =>
            {
                // configure identity options
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            });
            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<IdentityDbContext>().AddDefaultTokenProviders();
            var serviceProvider = services.BuildServiceProvider();
            return serviceProvider;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            Mapper.Initialize(cfg => {
                cfg.CreateMap<CompaniesViewModel, Company>();
                cfg.CreateMap<Company, CompaniesViewModel>();

                cfg.CreateMap<ConsultantsViewModel, Consultant>();
                cfg.CreateMap<Consultant, ConsultantsViewModel>();

                cfg.CreateMap<JobsViewModel, Job>();
                cfg.CreateMap<Job, JobsViewModel>();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "../ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            CreateRoles(serviceProvider).Wait();
        }
        private async Task CreateRoles(IServiceProvider serviceProvider)
        {
            //initializing custom roles 
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();
            string[] roleNames = { "Admin", "User", "Consultant", "Company" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await RoleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                    roleResult = await RoleManager.CreateAsync(new IdentityRole(roleName));
            }

            var superuser = new AppUser
            {
                UserName = "admin",
                Email = "admin@capstone1.com",
            };

            string password = "Cautiouswaddle1";
            var user = await UserManager.FindByEmailAsync("admin@capstone1.com");

            if (user == null)
            {
                var createPowerUser = await UserManager.CreateAsync(superuser, password);
                if (createPowerUser.Succeeded)
                    await UserManager.AddToRoleAsync(superuser, "Admin");
            }
    }
    }
}
