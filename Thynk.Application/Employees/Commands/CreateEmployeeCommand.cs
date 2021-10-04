using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Thynk.Application.Interfaces;
using Thynk.Application.Wrappers;
using Thynk.Domain;

namespace Thynk.Application.Employees.Commands
{
    public partial class CreateEmployeeCommand : IRequest<Response<Employee>>
    {
        public string Name { get; set; }
        public string Job { get; set; }
        public string Motto { get; set; }
        public string Hobbies { get; set; }
        public string Hometown { get; set; }
        public string PersonalBlog { get; set; }
    }

    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, Response<Employee>>
    {
        private readonly IMapper mapper;
        private readonly IEmployeeRepositoryAsync employeeRepository;

        public CreateEmployeeCommandHandler(IEmployeeRepositoryAsync employeeRepository, IMapper mapper) {
            this.employeeRepository = employeeRepository;
            this.mapper = mapper;
        }

        public IEmployeeRepositoryAsync EmployeeRepository { get; }

        public async Task<Response<Employee>> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var employee = mapper.Map<Employee>(request);
            await employeeRepository.AddAsync(employee);
            return new Response<Employee>(employee);
        }
    }
}
