namespace SimplePOS.Server.Dtos.Products
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }
    }
}
