using Neo4jClient;

namespace KvantasServer.Data.Repositories.ProductRepo
{
    public class ProductRepository : IProductRepository
    {
        private readonly IBoltGraphClient _neo4j;
        private readonly UnitOfWork _unitOfWork;
        private Func<User, string> fullNameBuilder;

        public ProductRepository(IBoltGraphClient neo, UnitOfWork unit)
        {
            _neo4j = neo;
            _unitOfWork = unit;
            fullNameBuilder = (User user) => $"{user.Name} {user.Surname}";
        }

        public async Task AddProduct(ProductPostDto dto)
        {
            if (dto == null)
                throw new ResponseException(400, "dto is not ok");

            var neoUser = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == dto.Owner)
                .Return(dbUser => new { User = dbUser.As<User>() }).ResultsAsync).SingleOrDefault();

            if (neoUser == null)
                throw new ResponseException(404, "User not found");

            var neoCategory = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->({KeyConsts.CategoryVar})")
                .Where((User dbUser, Category dbCategory) => dbUser.Username == dto.Owner && dbCategory.Name == dto.Product.Category)
                .Return(dbCategory => new { Category = dbCategory.As<Category>() }).ResultsAsync).SingleOrDefault();

            if (neoCategory == null)
                await _unitOfWork.CategoryRepository.AddCategory(dto.Owner, dto.Product.Category);

            await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]-({KeyConsts.CategoryVar})")
                .Where((User dbUser, Category dbCategory) => dbUser.Username == dto.Owner && dbCategory.Name == dto.Product.Category)
                .Create($"({KeyConsts.ProductKey} {dto.Product.ToString()}), ({KeyConsts.CategoryVar})-[:{LinkConsts.TypeLink}]->({KeyConsts.ProductVar})")
                .ExecuteWithoutResultsAsync();
        }

        public async Task DeleteProduct(string username, string categoryName, string productName)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(categoryName) || string.IsNullOrEmpty(productName))
                throw new ResponseException(400, "Bad request");

            await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->()-[:{LinkConsts.TypeLink}]->({KeyConsts.ProductVar})")
                .Where((User dbUser, Product dbProduct) => dbUser.Username == username && dbProduct.Name == productName && dbProduct.Category == categoryName)
                .DetachDelete($"{KeyConsts.ProductVar}")
                .ExecuteWithoutResultsAsync();

            var neoCategoryProducts = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->()-[:{LinkConsts.TypeLink}]->({KeyConsts.ProductVar})")
                .Where((User dbUser, Product dbProduct) => dbUser.Username == username && dbProduct.Category == categoryName && dbProduct.Name == categoryName)
                .Return((dbUser, dbProduct) => new { Product = dbProduct.As<Product>() })
                .ResultsAsync).ToList();

            if (neoCategoryProducts.Count == 0)
                await _unitOfWork.CategoryRepository.DeleteCategory(username, categoryName);
        }

        public async Task<List<ProductGetDto>> GetAllProducts()
        {
            List<ProductGetDto> result = new List<ProductGetDto>();

            var neoResult = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->()-[:{LinkConsts.TypeLink}]->({KeyConsts.ProductVar})")
                .Return((dbUser, dbProduct) => new { Product = dbProduct.As<Product>(), User = dbUser.As<User>() })
                .ResultsAsync).ToList();

            foreach (var prod in neoResult)
                result.Add(new ProductGetDto(prod.Product.Name, prod.Product.Category, prod.Product.Amount, prod.Product.Price, fullNameBuilder(prod.User)));

            return result;
        }

        public async Task<ProductGetDto> UpdateProduct(ProductPostDto dto)
        {
            if (dto == null)
                throw new ResponseException(400, "dto is not ok");

            if (string.IsNullOrEmpty(dto.Owner) || string.IsNullOrEmpty(dto.Product.Category))
                throw new ResponseException(400, "username and category must be set");

            var neoProduct = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->()-[:{LinkConsts.TypeLink}]->({KeyConsts.ProductVar})")
                .Where((User dbUser, Product dbProduct) => dbUser.Username == dto.Owner && dbProduct.Name == dto.Product.Name && dbProduct.Category == dto.Product.Category)
                .Return((dbUser, dbProduct) => new { ProductToUpdate = dbProduct.As<Product>(), User = dbUser.As<User>() })
                .ResultsAsync).SingleOrDefault();

            if (neoProduct == null)
                throw new ResponseException(404, "Product not found");

            neoProduct.ProductToUpdate.Name = string.IsNullOrEmpty(dto.Product.Name) ? neoProduct.ProductToUpdate.Name : dto.Product.Name;
            neoProduct.ProductToUpdate.Amount = dto.Product.Amount == 0 ? neoProduct.ProductToUpdate.Amount : dto.Product.Amount;
            neoProduct.ProductToUpdate.Price = dto.Product.Price == 0 ? neoProduct.ProductToUpdate.Price : dto.Product.Price;

            if (neoProduct.ProductToUpdate.Amount != 0)
                await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->()-[:{LinkConsts.TypeLink}]->({KeyConsts.ProductVar})")
                    .Where((User dbUser, Product dbProduct) => dbUser.Username == dto.Owner && dbProduct.Name == dto.Product.Name && dbProduct.Category == dto.Product.Category)
                    .Set($"{KeyConsts.ProductVar} = {neoProduct.ProductToUpdate.ToString()}")
                    .ExecuteWithoutResultsAsync();
            else
                await DeleteProduct(neoProduct.User.Username, neoProduct.ProductToUpdate.Category, neoProduct.ProductToUpdate.Name);

            return new ProductGetDto(neoProduct.ProductToUpdate.Name, neoProduct.ProductToUpdate.Category, neoProduct.ProductToUpdate.Amount, neoProduct.ProductToUpdate.Price, fullNameBuilder(neoProduct.User));
        }
    }
}
