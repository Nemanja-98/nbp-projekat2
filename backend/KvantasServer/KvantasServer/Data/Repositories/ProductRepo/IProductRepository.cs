namespace KvantasServer.Data.Repositories.ProductRepo
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProducts();
        Task AddProduct(ProductPostDto dto);
        Task<Product> UpdateProduct(ProductPostDto dto);
        Task DeleteProduct(string username, string categoryName, string productName);
    }
}
