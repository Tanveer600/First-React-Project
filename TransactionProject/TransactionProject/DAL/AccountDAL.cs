using Microsoft.EntityFrameworkCore;
using TransactionProject.Models;

namespace TransactionProject.DAL
{
    public class AccountDAL
    {
        private readonly DatabaseContext _context;
        public AccountDAL(DatabaseContext databaseContext)
        {
            this._context = databaseContext; 
        }

        public async Task<List<Account>> GetAllEmployeesAsync()
        {
            return await _context.Accounts.ToListAsync();
        }

        public async Task<Account> GetEmployeeByIdAsync(int id)
        {
            return await _context.Accounts.FindAsync(id);
        }
        public async Task<Account> AddEmployeeAsync(Account employee)
        {
            _context.Accounts.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Account> UpdateEmployeeAsync(Account employee)
        {
            _context.Accounts.Update(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Accounts.FindAsync(id);
            if (employee == null) return false;

            _context.Accounts.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
