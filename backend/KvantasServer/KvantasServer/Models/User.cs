using System.Text.Json;
using System.Text.Json.Serialization;

namespace KvantasServer.Models
{
    public class User
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Location { get; set; }

        public override string ToString()
        {
            return $"{{ {nameof(Username)}: \"{Username}\", " +
                $"{nameof(Password)}: \"{Password}\", " +
                $"{nameof(Name)}: \"{Name}\", " +
                $"{nameof(Surname)}: \"{Surname}\", " +
                $"{nameof(Location)}: \"{Location}\" }}";
        }
    }
}
