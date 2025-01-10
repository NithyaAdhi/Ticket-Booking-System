using System.ComponentModel.DataAnnotations;

namespace Services.Admin.Models
{
    public class Admins
    {
        [Key]
        public int AdminId { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
