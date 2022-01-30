using Neo4jClient;

namespace KvantasServer.Data.Repositories.ProductRepo
{
    public class ProductRepository : IProductRepository
    {
        private readonly IBoltGraphClient _neo4j;
        private readonly UnitOfWork _unitOfWork;

        public ProductRepository(IBoltGraphClient neo, UnitOfWork unit)
        {
            _neo4j = neo;
            _unitOfWork = unit;
        }

        public async Task AddProduct(ProductPostDto dto)
        {
            if (dto == null)
                throw new ResponseException(400, "dto is not ok");

            var neoUser = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == dto.Username)
                .Return(dbUser => new { User = dbUser.As<User>() }).ResultsAsync).SingleOrDefault();

            if (neoUser == null)
                throw new ResponseException(404, "User not found");

            var neoCategory = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->({KeyConsts.CategoryVar})")
                .Where((User dbUser, Category dbCategory) => dbUser.Username == dto.Username && dbCategory.Name == dto.Product.Category)
                .Return(dbCategory => new { Category = dbCategory.As<Category>() }).ResultsAsync).SingleOrDefault();

            if (neoCategory == null)
                await _unitOfWork.CategoryRepository.AddCategory(dto.Username, dto.Product.Category);

            await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]-({KeyConsts.CategoryVar})")
                .Where((User dbUser, Category dbCategory) => dbUser.Username == dto.Username && dbCategory.Name == dto.Product.Category)
                .Create($"({KeyConsts.ProductKey} {dto.Product.ToString()}), ({KeyConsts.CategoryVar})-[:{LinkConsts.TypeLink}]->({KeyConsts.ProductVar})")
                .ExecuteWithoutResultsAsync();
        }

        public Task DeleteProduct(string username, string categoryName, string productName)
        {
            throw new NotImplementedException();
        }

        public Task<List<Product>> GetAllProducts()
        {
            throw new NotImplementedException();
        }

        public Task<Product> UpdateProduct(ProductPostDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
