using Microsoft.AspNetCore.Mvc;

namespace KvantasServer.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private UnitOfWork _unitOfWork;

        public AuthController(UnitOfWork unit)
        {
            _unitOfWork = unit;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> login([FromBody]LoginDto creds)
        {
            try
            {
                User user = await _unitOfWork.UserRepository.GetUser(creds.Username);
                if (string.IsNullOrEmpty(creds.Password) || user.Password != creds.Password)
                    return Unauthorized("Wrong password");
                
                return Ok(user);
            }
            catch (ResponseException ex)
            {
                return StatusCode(ex.Status, ex.Message);
            }
        }
    }
}
