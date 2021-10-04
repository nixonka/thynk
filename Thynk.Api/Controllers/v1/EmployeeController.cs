using Discounts.Application.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Thynk.Application.Employees.Commands;
using Thynk.Application.Employees.Commands.DeleteEmployeeById;
using Thynk.Application.Employees.Commands.UpdateEmployee;
using Thynk.Application.Employees.Queries.GetAllEmployees;
using Thynk.Application.Employees.Queries.GetEmployeeById;
using Thynk.Application.Storage;

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
        public async Task<IActionResult> Post(CreateEmployeeCommand command, [FromForm] ICollection<IFormFile> files)
        {

            return Ok(await Mediator.Send(command));
        }

        [HttpPost("storage")]
        //[Authorize]
        [DisableRequestSizeLimit]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Post([FromForm] IFormFile file)
        {
            var command = new CreateBlobItemCommand();
            command.File = file;
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpGet("storage/{name}")]
        public async Task<IActionResult> Get(string name)
        {
            var result = await Mediator.Send(new GetBlobByNameQuery() { Name = name });

            return File(result.Data.Content, result.Data.ContentType);
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
