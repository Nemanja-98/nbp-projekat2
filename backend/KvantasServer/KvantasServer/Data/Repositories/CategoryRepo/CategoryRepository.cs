using Neo4jClient;

namespace KvantasServer.Data.Repositories.CategoryRepo
{
    public class CategoryRepository : ICategoryRepository
    {
        private IBoltGraphClient _neo4j;
        public CategoryRepository(IBoltGraphClient neo)
        {
            _neo4j = neo;
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

        public Task DeleteCategory(string username, string name)
        {
            throw new NotImplementedException();
        }
    }
}
