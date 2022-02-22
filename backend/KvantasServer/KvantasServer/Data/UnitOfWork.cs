using Neo4jClient;
using KvantasServer.Data.Repositories.UserRepo;
using KvantasServer.Data.Repositories.CategoryRepo;
using KvantasServer.Data.Repositories.ProductRepo;
using KvantasServer.Data.Repositories.InvoiceRepo;

namespace KvantasServer.Data
{
    public class UnitOfWork
    {
        private ILogger<UnitOfWork> _logger;
        private IBoltGraphClient _neo4j;

        private IUserRepository _userRepo;
        private ICategoryRepository _categoryRepo;
        private IProductRepository _productRepo;
        private IInvoiceRepository _invoiceRepository;

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

        public IInvoiceRepository InvoiceRepository { get => _invoiceRepository ??= new InvoiceRepository(_neo4j); }
    }
}
