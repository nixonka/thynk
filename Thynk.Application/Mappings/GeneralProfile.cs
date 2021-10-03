using AutoMapper;

using Thynk.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using Thynk.Application.Employees.Commands;
using Thynk.Application.Employees.Queries.GetAllEmployees;

namespace Thynk.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<CreateEmployeeCommand, Employee>();
            CreateMap<Employee, GetAllEmployeesViewModel>().ReverseMap();
            CreateMap<GetAllEmployeesQuery, GetAllEmployeesParameter>();
        }
    }
}
