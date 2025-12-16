using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimplePOS.Server.Dtos.Orders;
using SimplePOS.Server.Services.Orders;

namespace SimplePOS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController(IOrderService _service) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderDto dto)
        {
            return Ok(await _service.CreateAsync(dto));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllAsync());
        }
    }
}
