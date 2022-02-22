namespace KvantasServer.Models
{
    public class Invoice
    {
        public string BuyerName { get; set; }

        public string PhoneNumber { get; set; }
        
        public string Address { get; set; }
        
        public string ProductName { get; set; }

        public int Amount { get; set; }

        public int ProductPrice { get; set; }

        public override string ToString()
        {
            return $"{{ {nameof(BuyerName)}: \"{BuyerName}\"," +
                $"{nameof(PhoneNumber)}: \"{PhoneNumber}\"," +
                $"{nameof(Address)}: \"{Address}\"," +
                $"{nameof(ProductName)}: \"{ProductName}\"," +
                $"{nameof(Amount)}: \"{Amount}\"," +
                $"{nameof(ProductPrice)}: \"{ProductPrice}\"" +
                $"}}";
        }
    }
}
