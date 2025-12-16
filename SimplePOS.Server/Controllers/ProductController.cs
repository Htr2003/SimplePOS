using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimplePOS.Server.Services.Products;

namespace SimplePOS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(IProductService _service) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllAsync());
        }
    }
}
