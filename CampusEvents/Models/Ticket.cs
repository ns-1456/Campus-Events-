using System.ComponentModel.DataAnnotations;

namespace CampusEvents.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string TicketCode { get; set; } = string.Empty;
        
        [Required]
        public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UsedAt { get; set; }
        
        public bool IsUsed => UsedAt.HasValue;
        
        [StringLength(500)]
        public string? Notes { get; set; }
        
        // Foreign Keys
        [Required]
        public int EventId { get; set; }
        public Event Event { get; set; } = null!;
        
        [Required]
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; } = null!;
        
        // Computed properties
        public string QRCodeData => $"EVENT:{EventId}|USER:{UserId}|TICKET:{Id}|CODE:{TicketCode}";
        public bool IsValid => !IsUsed && Event.Date >= DateTime.Today;
        public TimeSpan? TimeUntilEvent => Event.Date - DateTime.Now;
    }
}
