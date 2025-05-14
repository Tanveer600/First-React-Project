using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TransactionProject.DAL;
using TransactionProject.Models;

namespace TransactionProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionDAL _transactionDAL;

        public TransactionController(TransactionDAL transactionDAL)
        {
            this._transactionDAL = transactionDAL;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransaction()
        {
            var employees = await _transactionDAL.GetAllEmployeesAsync();
            return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            var employee = await _transactionDAL.GetEmployeeByIdAsync(id);
            return employee == null ? NotFound() : Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] Transaction employee)
        {
            var newEmployee = await _transactionDAL.AddEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetTransactionById), new { id = newEmployee.ID }, newEmployee);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTransaction([FromBody] Transaction employee)
        {
            var updatedEmployee = await _transactionDAL.UpdateEmployeeAsync(employee);
            return Ok(updatedEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var result = await _transactionDAL.DeleteEmployeeAsync(id);
            return result ? NoContent() : NotFound();
        }
    }

}
