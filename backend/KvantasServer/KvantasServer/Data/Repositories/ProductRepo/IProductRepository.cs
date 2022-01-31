namespace KvantasServer.Data.Repositories.ProductRepo
{
    public interface IProductRepository
    {
        Task<List<ProductGetDto>> GetAllProducts();
        Task AddProduct(ProductPostDto dto);
        Task<ProductGetDto> UpdateProduct(ProductPostDto dto);
        Task DeleteProduct(string username, string categoryName, string productName);
    }
}
