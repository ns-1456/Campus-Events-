using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CampusEvents.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;
        
        [Required]
        public UserRole Role { get; set; } = UserRole.Student;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime LastLoginAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public ICollection<Event> OrganizedEvents { get; set; } = new List<Event>();
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
        
        // Computed properties
        public string DisplayName => !string.IsNullOrEmpty(FullName) ? FullName : UserName ?? Email ?? "Unknown User";
        public bool IsAdmin => Role == UserRole.Admin;
        public bool IsOrganizer => Role == UserRole.Organizer || Role == UserRole.Admin;
        public bool IsStudent => Role == UserRole.Student;
    }
    
    public enum UserRole
    {
        Student = 0,
        Organizer = 1,
        Admin = 2
    }
}
