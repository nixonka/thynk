using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Thynk.Application.Employees.Commands;
using Thynk.Application.Employees.Commands.DeleteEmployeeById;
using Thynk.Application.Employees.Commands.UpdateEmployee;
using Thynk.Application.Employees.Queries.GetAllEmployees;
using Thynk.Application.Employees.Queries.GetEmployeeById;

namespace Thynk.Api.Controllers.v1
{
    [ApiVersion("1.0")]
    public class EmployeeController : BaseController
    {
        //GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetAllEmployeesParameter filter)
        {
            return Ok(await Mediator.Send(new GetAllEmployeesQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber }));
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetEmployeeByIdQuery { Id = id }));
        }

        // POST api/<controller>
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> Post(CreateEmployeeCommand command)
        {
           return Ok(await Mediator.Send(command));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        //[Authorize]
        public async Task<IActionResult> Put(int id, UpdateEmployeeCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteEmployeeByIdCommand { Id = id }));
        }
    }
}
