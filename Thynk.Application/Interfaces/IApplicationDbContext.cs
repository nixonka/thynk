
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Thynk.Domain;

namespace Thynk.Application
{
    public interface IApplicationDbContext
    {
        DbSet<Employee> Employees { get; set; }
        Task<int> SaveChangesAsync();
    }
}
