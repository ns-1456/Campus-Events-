using System.ComponentModel.DataAnnotations;

namespace CampusEvents.Models
{
    public class Event
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public DateTime Date { get; set; }
        
        [Required]
        public TimeSpan Time { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Location { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Category { get; set; } = string.Empty;
        
        [Required]
        [StringLength(200)]
        public string Organization { get; set; } = string.Empty;
        
        [Required]
        [Range(1, 10000)]
        public int Capacity { get; set; }
        
        public int TicketsIssued { get; set; } = 0;
        
        [StringLength(500)]
        public string ImageUrl { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public string OrganizerId { get; set; } = string.Empty;
        public ApplicationUser? Organizer { get; set; }
        
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
        
        // Computed properties
        public bool IsFull => TicketsIssued >= Capacity;
        public int AvailableTickets => Capacity - TicketsIssued;
        public double AttendanceRate => Capacity > 0 ? (double)TicketsIssued / Capacity * 100 : 0;
    }
}
