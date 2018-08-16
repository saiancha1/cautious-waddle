using System.Collections.Generic;
using System.Linq;

namespace cautious_waddle.Models
{
    public class ListingsRepository : IListingsRepository
    {
        private ListingsDbContext _context;

        public ListingsRepository(ListingsDbContext context)
        {
            _context = context;
        }

        public void AddListing(Listing listing)
        {
            _context.Listings.Add(listing);
            _context.SaveChanges();
        }

        public void DeleteListing(Listing listing)
        {
            _context.Listings.Remove(listing);
            _context.SaveChanges();
        }

        public void EditListing(Listing listing)
        {
            _context.Listings.Update(listing);
            _context.SaveChanges();
        }

        public Listing GetListingById(int id)
        {
            return _context.Listings.SingleOrDefault(l => l.ListingId == id);;
        }

        public IEnumerable<Listing> GetListings()
        {
            return _context.Listings;
        }
    }
}