using Neo4jClient;

namespace KvantasServer.Data.Repositories.InvoiceRepo
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly IBoltGraphClient _neo4j;

        public InvoiceRepository(IBoltGraphClient neo4j)
        {
            _neo4j = neo4j;
        }

        public async Task AddInvoice(string username, Invoice invoice)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(invoice.BuyerName))
                throw new ResponseException(400, "Bad parameters");

            var neoUser = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == username)
                .Return(dbUser => new { User = dbUser.As<User>() }).ResultsAsync).SingleOrDefault();

            if (neoUser == null)
                throw new ResponseException(404, "User not found");

            await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == username)
                .Create(($"({KeyConsts.InvoiceKey} {invoice.ToString()}), ({KeyConsts.UserVar})-[:{LinkConsts.InvoiceLink}]->({KeyConsts.InvoiceVar})"))
                .ExecuteWithoutResultsAsync();
        }

        public async Task DeleteInvoice(string username, string buyerName, string productName)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(buyerName) || string.IsNullOrEmpty(productName))
                throw new ResponseException(400, "Bad request");

            await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.InvoiceLink}]->({KeyConsts.InvoiceVar})")
                .Where((User dbUser, Invoice dbInvoice) => dbUser.Username == username && dbInvoice.BuyerName == buyerName && dbInvoice.ProductName == productName)
                .DetachDelete($"{KeyConsts.InvoiceVar}")
                .ExecuteWithoutResultsAsync();
        }

        public async Task<List<Invoice>> GetInvoices(string username)
        {
            if (string.IsNullOrEmpty(username))
                throw new ResponseException(400, "Bad parameters");

            var neoUser = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})")
                .Where((User dbUser) => dbUser.Username == username)
                .Return(dbUser => new { User = dbUser.As<User>() }).ResultsAsync).SingleOrDefault();

            if (neoUser == null)
                throw new ResponseException(404, "User not found");

            List<Invoice> result = new List<Invoice>();

            var neoResult = (await _neo4j.Cypher.Match($"({KeyConsts.UserKey})-[:{LinkConsts.InvoiceLink}]->({KeyConsts.InvoiceVar})")
                .Where((User dbUser) => dbUser.Username == username)
                .Return((dbInvoice) => new { Invoice = dbInvoice.As<Invoice>() })
                .ResultsAsync).ToList();

            foreach (var invoice in neoResult)
                result.Add(invoice.Invoice);

            return result;
        }
    }
}
