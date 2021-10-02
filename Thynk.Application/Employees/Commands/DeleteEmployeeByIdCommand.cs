using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Thynk.Application.Exceptions;
using Thynk.Application.Interfaces;
using Thynk.Application.Wrappers;

namespace Thynk.Application.Employees.Commands.DeleteEmployeeById
{
    public class DeleteEmployeeByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public class DeleteEmployeeByIdCommandHandler : IRequestHandler<DeleteEmployeeByIdCommand, Response<int>>
        {
            private readonly IEmployeeRepositoryAsync _employeeRepository;
            public DeleteEmployeeByIdCommandHandler(IEmployeeRepositoryAsync employeeRepository)
            {
                _employeeRepository = employeeRepository;
            }
            public async Task<Response<int>> Handle(DeleteEmployeeByIdCommand command, CancellationToken cancellationToken)
            {
                var employee = await _employeeRepository.GetByIdAsync(command.Id);
                if (employee == null) throw new ApiException($"Employee Not Found.");
                await _employeeRepository.DeleteAsync(employee);
                return new Response<int>(employee.Id);
            }
        }
    }
}
