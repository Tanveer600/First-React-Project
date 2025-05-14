using Microsoft.EntityFrameworkCore;
using TransactionProject.Models;

namespace TransactionProject.DAL
{
    public class UserDAL
    {
        private readonly DatabaseContext _context;

        public UserDAL(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<User?> LoginUserAsync(string username)
        {
            try
            {
                return await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
            }
            catch
            {
                return null;
            }
        }
    }
}
