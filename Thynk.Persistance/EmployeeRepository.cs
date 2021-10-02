using Microsoft.EntityFrameworkCore;
using Thynk.Application.Interfaces;
using Thynk.Domain;
using Thynk.Persistence;

namespace Thynk.Persistance
{
    public class EmployeeRepositoryAsync : GenericRepositoryAsync<Employee>, IEmployeeRepositoryAsync
    {
        private readonly DbSet<Employee> employees;

        public EmployeeRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            employees = dbContext.Set<Employee>();
        }
    }
}
