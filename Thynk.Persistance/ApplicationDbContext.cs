using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Thynk.Application;
using Thynk.Domain;

namespace Thynk.Persistance
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        public DbSet<Employee> Employees { get; set; }
        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        { }
    }
}
