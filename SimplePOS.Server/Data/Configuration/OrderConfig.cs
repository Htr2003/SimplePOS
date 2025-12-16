using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SimplePOS.Server.Models;

namespace SimplePOS.Server.Data.Configuration
{
    public class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.TotalAmount)
                   .IsRequired()
                   .HasColumnType("decimal(18,2)");

            builder.Property(x => x.CreatedAt)
                   .IsRequired();
        }
    }
}
