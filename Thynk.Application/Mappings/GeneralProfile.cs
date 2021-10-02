using AutoMapper;

using Thynk.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using Thynk.Application.Employees.Commands;

namespace Thynk.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<CreateEmployeeCommand, Employee>();
            //CreateMap<Emplyee, GetAllEmplyeesViewModel>().ReverseMap();
            //CreateMap<GetAllEmplyeesQuery, GetAllEmplyeesParameter>();
            //CreateMap<ValueItem, GetListOfValuesEmplyeesViewModel>().ReverseMap();
        }
    }
}
