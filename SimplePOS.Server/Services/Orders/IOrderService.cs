using SimplePOS.Server.Dtos.Orders;

namespace SimplePOS.Server.Services.Orders
{
    public interface IOrderService
    {
        Task<OrderDto> CreateAsync(CreateOrderDto dto);
        Task<List<OrderDto>> GetAllAsync();
    }
}
