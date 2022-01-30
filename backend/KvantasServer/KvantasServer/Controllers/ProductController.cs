using Microsoft.AspNetCore.Mvc;

namespace KvantasServer.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private UnitOfWork _unitOfWork;

        public ProductController(UnitOfWork unit)
        {
            _unitOfWork = unit;
        }

        [HttpPost("AddProduct")]
        public async Task<ActionResult> AddProduct([FromBody]ProductPostDto dto)
        {
            try
            {
                await _unitOfWork.ProductRepository.AddProduct(dto);
                return Ok("Product added");
            }
            catch (ResponseException ex)
            {
                return StatusCode(ex.Status, ex.Message);
            }
        }
    }
}
