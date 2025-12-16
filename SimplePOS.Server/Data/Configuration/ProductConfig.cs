using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SimplePOS.Server.Models;

namespace SimplePOS.Server.Data.Configuration
{
    public class ProductConfig : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(x => x.Price)
                   .IsRequired()
                   .HasColumnType("decimal(18,2)");

            builder.HasData(
                new Product { Id = 1, Name = "Product A", Price = 9.99m },
                new Product { Id = 2, Name = "Product B", Price = 19.99m },
                new Product { Id = 3, Name = "Product C", Price = 29.99m }
            );
        }
    }
}
