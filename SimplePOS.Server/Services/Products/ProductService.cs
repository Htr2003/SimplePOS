using Microsoft.EntityFrameworkCore;
using SimplePOS.Server.Data;
using SimplePOS.Server.Dtos.Products;

namespace SimplePOS.Server.Services.Products
{
    public class ProductService(AppDbContext _context) : IProductService
    {
        public async Task<List<ProductDto>> GetAllAsync()
        {
            return await _context.Products
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price
                })
                .ToListAsync();
        }
    }
}
