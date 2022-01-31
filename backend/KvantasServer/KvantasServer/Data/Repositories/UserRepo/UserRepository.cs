using Neo4jClient;
using System.Text.Json;

namespace KvantasServer.Data.Repositories.UserRepo
{
    public class UserRepository : IUserRepository
    {
        private readonly IBoltGraphClient _neo4j;

        public UserRepository(IBoltGraphClient neo)
        {
            _neo4j = neo;
        }

        public async Task AddUser(User user)
        {
            if (user == null)
                throw new ResponseException(404, "user dto not ok");

            var neoUser = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == user.Username)
                .Return(dbUser => new { User = dbUser.As<User>() }).ResultsAsync).SingleOrDefault();
            
            if (neoUser != null)
                throw new ResponseException(409, "Already exists");
            await _neo4j.Cypher.Create($"({KeyConsts.UserKey} {user.ToString()})").ExecuteWithoutResultsAsync();
        }

        public Task DeleteUser(string username)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetUser(string username)
        {
            if (string.IsNullOrEmpty(username))
                throw new ResponseException(400, "username is not set");

            var neoUser = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == username)
                .Return(dbUser => new { User = dbUser.As<User>() }).ResultsAsync).SingleOrDefault();

            if (neoUser == null)
                throw new ResponseException(404, "User not found");

            return neoUser.User;
        }

        public Task<User> UpdateAsync(User user)
        {
            throw new NotImplementedException();
        }
    }
}
