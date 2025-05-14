using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransactionProject.DAL;
using TransactionProject.Models;

namespace TransactionProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        private readonly DatabaseContext context;

        public UserController(DatabaseContext context)
        {
            this.context = context;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            ResponseDataModel response = new ResponseDataModel();

            if (userObj == null)
            {
                response.IsSuccess = false;
                response.Message = "Invalid request.";
                return BadRequest(response);
            }

            try
            {
                var userDAL = new UserDAL(context);
                var user = await userDAL.LoginUserAsync(userObj.UserName);

                if (user != null && user.Password == userObj.Password)
                {
                    //var userRole = await context.UserRoles.FindAsync(user.RoleID);

                    response.IsSuccess = true;
                    response.Message = "Login successful!";
                    response.Data = new List<object> {
                    new {
                        User = user,
                        //UserRole = userRole
                    }
                };
                    return Ok(response);
                }

                response.IsSuccess = false;
                response.Message = "Invalid username or password.";
                return NotFound(response);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "An error occurred during login.";
                response.ErrorResponse = ex;
                return StatusCode(500, response);
            }
        }
            [HttpPost("register")]
        public async Task<ActionResult> RegisterUser([FromBody] User Userobj)
        {
            if (Userobj == null)
            {
                return BadRequest();

            }
            await context.Users.AddAsync(Userobj);
            await context.SaveChangesAsync();
            return Ok(new
            {
                Message = "user register successfully"
            });

        }
    }
}
