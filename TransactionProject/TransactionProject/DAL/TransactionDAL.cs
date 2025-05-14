using Microsoft.EntityFrameworkCore;
using System;
using TransactionProject.Models;

namespace TransactionProject.DAL
{
    public class TransactionDAL
    {
        private readonly DatabaseContext _context;
        public TransactionDAL(DatabaseContext databaseContext)
        {
            this._context = databaseContext;
        }
        public async Task<List<Transaction>> GetAllEmployeesAsync()
        {
            return await _context.Transactions.ToListAsync();
        }

        public async Task<Transaction> GetEmployeeByIdAsync(int id)
        {
            return await _context.Transactions.FindAsync(id);
        }

        public async Task<Transaction> AddEmployeeAsync(Transaction employee)
        {
            _context.Transactions.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Transaction> UpdateEmployeeAsync(Transaction employee)
        {
            _context.Transactions.Update(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Transactions.FindAsync(id);
            if (employee == null) return false;

            _context.Transactions.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
