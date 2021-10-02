using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Thynk.Application.Wrappers;
using Thynk.Domain;

namespace Thynk.Application.Employees.Commands
{
    public partial class CreateEmployeeCommand : IRequest<Response<int>>
    {
        public string Name { get; set; }
    }

    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, Response<int>>
    {
        private readonly IMapper mapper;

        public CreateEmployeeCommandHandler( IMapper mapper) {
            this.mapper = mapper;
        }



        public async Task<Response<int>> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var employee = mapper.Map<Employee>(request);
            return new Response<int>(employee.Id);
        }
    }
}
