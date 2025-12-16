# 1. Base Image (NET 10)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# 2. Build Image (NET 10 SDK)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release

# --- Node.js ---
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /src
COPY ["SimplePOS.Server/SimplePOS.Server.csproj", "SimplePOS.Server/"]
COPY ["simplepos.client/simplepos.client.esproj", "simplepos.client/"]
RUN dotnet restore "./SimplePOS.Server/SimplePOS.Server.csproj"
COPY . .
WORKDIR "/src/SimplePOS.Server"
RUN dotnet build "./SimplePOS.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# 3. Publish Stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./SimplePOS.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# 4. Final Stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SimplePOS.Server.dll"]