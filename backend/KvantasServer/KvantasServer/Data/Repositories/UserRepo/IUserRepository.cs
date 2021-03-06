namespace KvantasServer.Data.Repositories.UserRepo
{
    public interface IUserRepository
    {
        public Task<User> GetUser(string username);
        public Task AddUser(User user);
        public Task<User> UpdateUser(User user);
        public Task DeleteUser(string username);
    }
}
