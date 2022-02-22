namespace KvantasServer.Data.Repositories.InvoiceRepo
{
    public interface IInvoiceRepository
    {
        Task<List<Invoice>> GetInvoices(string username);
        Task AddInvoice(string username, Invoice invoice);
        Task DeleteInvoice(string username, string buyerName, string productName);
    }
}
