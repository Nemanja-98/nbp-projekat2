using Neo4jClient;

namespace KvantasServer.Data.Repositories.CategoryRepo
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IBoltGraphClient _neo4j;
        private readonly UnitOfWork _unitOfWork;

        public CategoryRepository(IBoltGraphClient neo, UnitOfWork unit)
        {
            _neo4j = neo;
            _unitOfWork = unit;
        }

        public async Task AddCategory(string username, string name)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(name))
                throw new ResponseException(400, "Bad parameters");

            var neoUser = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == username)
                .Return(dbUser => new { User = dbUser.As<User>() }).ResultsAsync).SingleOrDefault();

            if (neoUser == null)
                throw new ResponseException(404, "User not found");

            await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == username)
                .Create($"({KeyConsts.CategoryKey} {(new Category() { Name = name}).ToString()}), ({KeyConsts.UserVar})-[:{LinkConsts.CategoryLink}]->({KeyConsts.CategoryVar})")
                .ExecuteWithoutResultsAsync();
        }

        public async Task DeleteCategory(string username, string name)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(name))
                throw new ResponseException(400, "Bad request");

            var neoConnectedProducts = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->()-[:{LinkConsts.TypeLink}]->({KeyConsts.ProductVar})")
                .Where((User dbUser, Product dbProduct) => dbUser.Username == username && dbProduct.Category == name)
                .Return((dbUser, dbProduct) => new { ProductToDelete = dbProduct.As<Product>(), User = dbUser.As<User>() })
                .ResultsAsync).ToList();

            foreach (var neoProduct in neoConnectedProducts)
                await _unitOfWork.ProductRepository.DeleteProduct(neoProduct.User.Username, neoProduct.ProductToDelete.Category, neoProduct.ProductToDelete.Name);

            await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->({KeyConsts.CategoryVar})")
                .Where((User dbUser, Category dbCategory) => dbUser.Username == username && dbCategory.Name == name)
                .DetachDelete($"{KeyConsts.CategoryVar}")
                .ExecuteWithoutResultsAsync();
        }
    }
}
