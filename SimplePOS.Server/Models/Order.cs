namespace SimplePOS.Server.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
