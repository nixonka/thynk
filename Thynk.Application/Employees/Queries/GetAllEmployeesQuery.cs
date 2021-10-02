using AutoMapper;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Thynk.Application.Interfaces;
using Thynk.Application.Wrappers;

namespace Thynk.Application.Employees.Queries.GetAllEmployees
{
    public class GetAllEmployeesQuery : IRequest<PagedResponse<IEnumerable<GetAllEmployeesViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
    public class GetAllEmployeesQueryHandler : IRequestHandler<GetAllEmployeesQuery, PagedResponse<IEnumerable<GetAllEmployeesViewModel>>>
    {
        private readonly IEmployeeRepositoryAsync employeeRepository;
        private readonly IMapper _mapper;
        public GetAllEmployeesQueryHandler(IEmployeeRepositoryAsync employeeRepository, IMapper mapper)
        {
            this.employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<PagedResponse<IEnumerable<GetAllEmployeesViewModel>>> Handle(GetAllEmployeesQuery request, CancellationToken cancellationToken)
        {
            var validFilter = _mapper.Map<GetAllEmployeesParameter>(request);
            var employee = await employeeRepository.GetPagedReponseAsync(validFilter.PageNumber, validFilter.PageSize);
            var employeeViewModel = _mapper.Map<IEnumerable<GetAllEmployeesViewModel>>(employee);
            var count = await employeeRepository.GetAllCountAsync();

            return new PagedResponse<IEnumerable<GetAllEmployeesViewModel>>(employeeViewModel, validFilter.PageNumber, validFilter.PageSize, count);
        }
    }
}
