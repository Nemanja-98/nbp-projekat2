namespace KvantasServer.Models
{
    public class Category
    {
        public string Name { get; set; }

        public override string ToString()
        {
            return $"{{ {nameof(Name)}: \"{Name}\" }}";
        }
    }
}
