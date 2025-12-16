using SimplePOS.Server.Dtos.Products;

namespace SimplePOS.Server.Services.Products
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllAsync();
    }
}
