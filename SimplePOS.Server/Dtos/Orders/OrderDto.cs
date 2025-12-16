namespace SimplePOS.Server.Dtos.Orders
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
