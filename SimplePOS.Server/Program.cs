using Microsoft.EntityFrameworkCore;
using SimplePOS.Server.Data;
using SimplePOS.Server.Hubs;
using SimplePOS.Server.Services.Orders;
using SimplePOS.Server.Services.Products;

var builder = WebApplication.CreateBuilder(args);

// Add DB Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("https://localhost:50379") // React app URL
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()); 
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "SimplePOS API V1");
        options.RoutePrefix = "swagger"; // Optional: makes Swagger UI available at /swagger
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowReactApp");
app.MapControllers();

// Endpoint for SignalR Hub
app.MapHub<OrderHub>("/orderHub");

app.MapFallbackToFile("/index.html");

app.Run();
