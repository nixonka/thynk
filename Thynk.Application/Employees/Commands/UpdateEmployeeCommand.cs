using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Thynk.Application.Exceptions;
using Thynk.Application.Interfaces;
using Thynk.Application.Wrappers;

namespace Thynk.Application.Employees.Commands.UpdateEmployee
{
    public class UpdateEmployeeCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, Response<int>>
        {
            private readonly IEmployeeRepositoryAsync employeeRepository;
            public UpdateEmployeeCommandHandler(IEmployeeRepositoryAsync employeeRepository)
            {
                this.employeeRepository = employeeRepository;
            }
            public async Task<Response<int>> Handle(UpdateEmployeeCommand command, CancellationToken cancellationToken)
            {
                var employee = await employeeRepository.GetByIdAsync(command.Id);

                if (employee == null)
                {
                    throw new ApiException($"Employee Not Found.");
                }
                else
                {
                    employee.Name = command.Name;
                    await employeeRepository.UpdateAsync(employee);
                    return new Response<int>(employee.Id);
                }
            }
        }
    }
}
