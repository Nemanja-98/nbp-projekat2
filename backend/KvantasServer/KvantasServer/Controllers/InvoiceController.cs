using Microsoft.AspNetCore.Mvc;

namespace KvantasServer.Controllers
{
    [Route("api/[controller]")]
    public class InvoiceController : Controller
    {
        private UnitOfWork _unitOfWork;

        public InvoiceController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetInvoices/{username}")]
        public async Task<ActionResult<List<Invoice>>> GetInvoices([FromRoute]string username)
        {
            try
            {
                return await _unitOfWork.InvoiceRepository.GetInvoices(username);
            }
            catch(ResponseException ex)
            {
                return StatusCode(ex.Status, ex.Message);
            }
        }

        [HttpPost("AddInvoice/{username}")]
        public async Task<ActionResult> AddInvoice([FromRoute]string username, [FromBody]Invoice invoice)
        {
            try
            {
                await _unitOfWork.InvoiceRepository.AddInvoice(username, invoice);
                return Ok("Invoice added");
            }
            catch (ResponseException ex)
            {
                return StatusCode(ex.Status, ex.Message);
            }
        }

        [HttpDelete("DeleteInvoice/{username}/{buyerName}/{productName}")]
        public async Task<ActionResult> DeleteInvoice([FromRoute] string username, [FromRoute] string buyerName, [FromRoute]string productName)
        {
            try
            {
                await _unitOfWork.InvoiceRepository.DeleteInvoice(username, buyerName, productName);
                return Ok("Invoice deleted");
            }
            catch (ResponseException ex)
            {
                return StatusCode(ex.Status, ex.Message);
            }
        }
    }
}
