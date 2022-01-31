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

        [HttpGet("GetAllProducts")]
        public async Task<ActionResult<List<ProductGetDto>>> GetAllProducts()
        {
            try
            {
                return await _unitOfWork.ProductRepository.GetAllProducts();
            }
            catch (ResponseException ex)
            {
                return StatusCode(ex.Status, ex.Message);
            }
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

        [HttpPut("UpdateProduct")]
        public async Task<ActionResult<ProductGetDto>> UpdateProduct([FromBody]ProductPostDto dto)
        {
            try
            {
                return await _unitOfWork.ProductRepository.UpdateProduct(dto);
            }
            catch (ResponseException ex)
            {
                return StatusCode(ex.Status, ex.Message);
            }
        }

        [HttpDelete("DeleteProduct/{username}/{categoryName}/{productName}")]
        public async Task<ActionResult> DeleteProduct(string username, string categoryName, string productName)
        {
            try
            {
                await _unitOfWork.ProductRepository.DeleteProduct(username, categoryName, productName);
                return Ok("Product ddeleted");
            }
            catch (ResponseException ex)
            {
                return StatusCode(ex.Status, ex.Message);
            }
        }
    }
}
