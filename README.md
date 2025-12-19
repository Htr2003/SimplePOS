# SimplePOS

SimplePOS là một ứng dụng Point-of-Sale (POS) đơn giản phục vụ mục đích học tập / demo.  
Repository gồm 2 phần chính:
- SimplePOS.Server — backend (API) viết bằng .NET (project trong solution)
- simplepos.client — frontend React + Vite


## Yêu cầu (Prerequisites)
- .NET SDK 8.0+ (hoặc version mà project target)  
- Node.js 18+ và npm / yarn / pnpm  
- dotnet-ef tool: (chỉ khi dùng EF Core migrations)
  - dotnet tool install --global dotnet-ef
- Một database để phát triển local:
  - SQL Server (LocalDB / SQL Express)


---

## Cấu trúc chính
- SimplePOS.Server/      — backend (.NET)
- simplepos.client/      — frontend (React + Vite)
- SimplePOS.slnx         — .NET solution

---

## Cấu hình kết nối database (local)
Mở file cấu hình của backend (ví dụ `appsettings.Development.json`) và cấu hình connection string. Ví dụ:

- SQL Server (LocalDB):
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SimplePOSDb;Trusted_Connection=True;"
}
```

## Migration & Update Database (EF Core)
Các lệnh dưới đây giả định project của bạn sử dụng EF Core và DbContext nằm trong project `SimplePOS.Server`. Nếu DbContext ở project khác, dùng tham số `-p` / `-s` tương ứng.

1. Cài công cụ EF Core (nếu chưa):
```bash
dotnet tool install --global dotnet-ef
```

2. Tạo migration (lần đầu hoặc khi có thay đổi model):
```bash
cd SimplePOS.Server
dotnet ef migrations add InitialCreate
```


3. Áp dụng migration lên database:
```bash
dotnet ef database update
```
Với tham số project/startup:
```bash
dotnet ef database update -p ./SimplePOS.Server -s ./SimplePOS.Server
```

4. Kiểm tra migration:
- Kiểm tra thư mục `Migrations/` trong project backend để thấy migration file.
- Kiểm tra database (sqlite file hoặc server) để xác nhận bảng đã được tạo.

---

## Chạy ứng dụng trên localhost (phát triển)

1) Backend (.NET)
```bash
# từ thư mục gốc repo
cd SimplePOS.Server

# restore & build
dotnet restore
dotnet build

# cập nhật database (chạy migration áp dụng)
dotnet ef database update

# chạy backend
dotnet run

2) Frontend (React + Vite)
Mở terminal mới:
```bash
cd simplepos.client
npm install
# cấu hình biến môi trường client (ví dụ .env.local)
# VITE_API_BASE_URL=http://localhost:5000

npm run dev
```
- Vite dev server mặc định: `http://localhost:5173`.

## Tự động áp dụng migration khi ứng dụng khởi động (tùy chọn)
Bạn có thể cấu hình backend để tự chạy migrations khi khởi động (phù hợp môi trường dev):

Program.cs (hoặc nơi khởi tạo app):
```csharp
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<YourDbContext>();
    db.Database.Migrate();
}
```
## License
