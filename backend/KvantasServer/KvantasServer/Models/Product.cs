namespace KvantasServer.Models
{
    public class Product
    {
        public string Name { get; set; }

        public string Category { get; set; }

        public int Amount { get; set; }

        public int Price { get; set; }

        public override string ToString()
        {
            return $"{{ {nameof(Name)}: \"{Name}\", " +
                $"{nameof(Category)}: \"{Category}\", " +
                $"{nameof(Amount)}: \"{Amount}\", " +
                $"{nameof(Price)}: {Price} }}";
        }
    }
}
