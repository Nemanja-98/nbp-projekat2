using KvantasServer.Constants;
using Neo4jClient;
using System.Text.Json;
using KvantasServer.Records;
using KvantasServer.Data.Repositories.UserRepo;
using KvantasServer.Data.Repositories.CategoryRepo;
using KvantasServer.Data.Repositories.ProductRepo;

namespace KvantasServer.Data
{
    public class UnitOfWork
    {
        private ILogger<UnitOfWork> _logger;
        private IBoltGraphClient _neo4j;

        private IUserRepository _userRepo;
        private ICategoryRepository _categoryRepo;
        private IProductRepository _productRepo;

        public UnitOfWork(ILogger<UnitOfWork> log)
        {
            _logger = log;
            try
            {
                _neo4j = new BoltGraphClient(new Uri(@"bolt://localhost:7687/db/data"));
                _neo4j.ConnectAsync().Wait();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public IUserRepository UserRepository { get => _userRepo ??= new UserRepository(_neo4j, this); }

        public ICategoryRepository CategoryRepository { get => _categoryRepo ??= new CategoryRepository(_neo4j, this); }

        public IProductRepository ProductRepository { get => _productRepo ??= new ProductRepository(_neo4j, this); }
    }
}
