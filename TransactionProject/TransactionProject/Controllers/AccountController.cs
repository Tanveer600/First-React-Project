using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TransactionProject.DAL;
using TransactionProject.Models;

namespace TransactionProject.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountDAL _accountDAL;

        public AccountController(AccountDAL employeeDAL)
        {
            _accountDAL = employeeDAL;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = await _accountDAL.GetAllEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _accountDAL.GetEmployeeByIdAsync(id);
            return employee == null ? NotFound() : Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Account employee)
        {
            var newEmployee = await _accountDAL.AddEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetById), new { id = newEmployee.ID }, newEmployee);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Account employee)
        {
            var updatedEmployee = await _accountDAL.UpdateEmployeeAsync(employee);
            return Ok(updatedEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _accountDAL.DeleteEmployeeAsync(id);
            return result ? NoContent() : NotFound();
        }
    }

}
