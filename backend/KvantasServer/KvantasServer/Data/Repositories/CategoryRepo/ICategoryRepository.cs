namespace KvantasServer.Data.Repositories.CategoryRepo
{
    public interface ICategoryRepository
    {
        Task AddCategory(string username, string name);
        Task DeleteCategory(string username, string name);
    }
}
