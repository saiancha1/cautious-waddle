using System.Linq;

namespace cautious_waddle.Models
{
    public class ProfilesRepository : IProfilesRepository
    {
        private ProfilesDbContext _context;

        public ProfilesRepository(ProfilesDbContext context) {
            _context = context;
        }

        public Profile GetProfileById(int id)
        {
            return _context.Profiles.SingleOrDefault(p => p.ProfileId == id);
        }
    }
}