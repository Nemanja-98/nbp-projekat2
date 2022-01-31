namespace KvantasServer.Records
{
    public record ProductPostDto(string Owner, Product Product);
    public record ProductGetDto(string Name, string Category, int Amount, int Price, string Owner);
    public record LoginDto(string Username, string Password);
}
