using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Thynk.Application.Exceptions;
using Thynk.Application.Interfaces;
using Thynk.Application.Wrappers;
using Thynk.Domain;

namespace Thynk.Application.Employees.Queries.GetEmployeeById
{
    public class GetEmployeeByIdQuery : IRequest<Response<Employee>>
    {
        public int Id { get; set; }
        public class GetEmployeeByIdQueryHandler : IRequestHandler<GetEmployeeByIdQuery, Response<Employee>>
        {
            private readonly IEmployeeRepositoryAsync employeeRepository;
            public GetEmployeeByIdQueryHandler(IEmployeeRepositoryAsync employeeRepository)
            {
                this.employeeRepository = employeeRepository;
            }
            public async Task<Response<Employee>> Handle(GetEmployeeByIdQuery query, CancellationToken cancellationToken)
            {
                var employee = await employeeRepository.GetByIdAsync(query.Id);
                if (employee == null) throw new ApiException($"Employee Not Found.");
                return new Response<Employee>(employee);
            }
        }
    }
}
