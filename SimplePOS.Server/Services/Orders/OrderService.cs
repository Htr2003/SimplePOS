using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SimplePOS.Server.Data;
using SimplePOS.Server.Dtos.Orders;
using SimplePOS.Server.Hubs;
using SimplePOS.Server.Models;

namespace SimplePOS.Server.Services.Orders
{
    public class OrderService(AppDbContext _context, IHubContext<OrderHub> _hub) : IOrderService
    {
        public async Task<OrderDto> CreateAsync(CreateOrderDto dto)
        {
            var order = new Order
            {
                Id = Guid.NewGuid(),
                TotalAmount = dto.TotalAmount,
                CreatedAt = DateTime.UtcNow
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var orderDto = new OrderDto
            {
                Id = order.Id,
                TotalAmount = order.TotalAmount,
                CreatedAt = order.CreatedAt
            };

            await _hub.Clients.All.SendAsync("NewOrder", orderDto);

            return orderDto;
        }

        public async Task<List<OrderDto>> GetAllAsync()
        {
            return await _context.Orders
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new OrderDto
                {
                    Id = o.Id,
                    TotalAmount = o.TotalAmount,
                    CreatedAt = o.CreatedAt
                })
                .ToListAsync();
        }
    }
}
