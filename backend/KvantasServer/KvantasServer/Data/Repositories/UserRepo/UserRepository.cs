using Neo4jClient;
using System.Text.Json;

namespace KvantasServer.Data.Repositories.UserRepo
{
    public class UserRepository : IUserRepository
    {
        private readonly IBoltGraphClient _neo4j;
        private readonly UnitOfWork _unitOfWork;

        public UserRepository(IBoltGraphClient neo, UnitOfWork unit)
        {
            _neo4j = neo;
            _unitOfWork = unit;
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

        public async Task DeleteUser(string username)
        {
            if (string.IsNullOrEmpty(username))
                throw new ResponseException(400, "username is not set");

            var neoConnectedCategories = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.CategoryLink}]->({KeyConsts.CategoryVar})")
                .Where((User dbUser, Category dbCategory) => dbUser.Username == username)
                .Return((dbUser, dbCategory) => new { CategoryToDelete = dbCategory.As<Category>() })
                .ResultsAsync).ToList();

            foreach (var neoCategory in neoConnectedCategories)
                await _unitOfWork.CategoryRepository.DeleteCategory(username, neoCategory.CategoryToDelete.Name);

            var neoConnectedInvoices = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.InvoiceLink}]->({KeyConsts.InvoiceVar})")
                .Where((User dbUser) => dbUser.Username == username)
                .Return((dbInvoice) => new { Invoice = dbInvoice.As<Invoice>() })
                .ResultsAsync).ToList();

            foreach (var neoInvoice in neoConnectedInvoices)
                await _unitOfWork.InvoiceRepository.DeleteInvoice(username, neoInvoice.Invoice.BuyerName, neoInvoice.Invoice.ProductName);

            await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == username)
                .DetachDelete($"{KeyConsts.UserVar}")
                .ExecuteWithoutResultsAsync();
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

        public async Task<User> UpdateUser(User user)
        {
            if (user == null)
                throw new ResponseException(400, "user is null");

            var neoUser = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == user.Username)
                .Return(dbUser => new { User = dbUser.As<User>() }).ResultsAsync).SingleOrDefault();

            if (neoUser == null)
                throw new ResponseException(404, "User not found");

            neoUser.User.Password = string.IsNullOrEmpty(user.Password) ? neoUser.User.Password : user.Password;
            neoUser.User.Name = string.IsNullOrEmpty(user.Name) ? neoUser.User.Name : user.Name;
            neoUser.User.Surname = string.IsNullOrEmpty(user.Surname) ? neoUser.User.Surname : user.Surname;
            neoUser.User.Location = string.IsNullOrEmpty(user.Location) ? neoUser.User.Location : user.Location;

            neoUser = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == user.Username)
                .Set($"{KeyConsts.UserVar} = {neoUser.User.ToString()}")
                .Return(dbUser => new { User = dbUser.As<User>() })
                .ResultsAsync).SingleOrDefault();

            if (neoUser == null)
                throw new ResponseException(500, "Something went wrong");

            return neoUser.User;
        }
    }
}
