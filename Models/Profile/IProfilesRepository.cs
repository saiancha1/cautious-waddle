namespace cautious_waddle.Models
{
    public interface IProfilesRepository
    {
        Profile GetProfileById(int id);
    }
}