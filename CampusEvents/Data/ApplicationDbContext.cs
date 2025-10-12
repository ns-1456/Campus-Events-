using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CampusEvents.Models;

namespace CampusEvents.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure Event entity
            builder.Entity<Event>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).IsRequired().HasMaxLength(2000);
                entity.Property(e => e.Location).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Category).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Organization).IsRequired().HasMaxLength(200);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
                
                entity.HasOne(e => e.Organizer)
                    .WithMany(u => u.OrganizedEvents)
                    .HasForeignKey(e => e.OrganizerId)
                    .OnDelete(DeleteBehavior.Restrict);
                
                entity.HasMany(e => e.Tickets)
                    .WithOne(t => t.Event)
                    .HasForeignKey(t => t.EventId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure Ticket entity
            builder.Entity<Ticket>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.TicketCode).IsRequired().HasMaxLength(50);
                entity.Property(t => t.Notes).HasMaxLength(500);
                
                entity.HasOne(t => t.Event)
                    .WithMany(e => e.Tickets)
                    .HasForeignKey(t => t.EventId)
                    .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(t => t.User)
                    .WithMany(u => u.Tickets)
                    .HasForeignKey(t => t.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
                
                // Ensure ticket codes are unique
                entity.HasIndex(t => t.TicketCode).IsUnique();
            });

            // Configure ApplicationUser entity
            builder.Entity<ApplicationUser>(entity =>
            {
                entity.Property(u => u.FullName).IsRequired().HasMaxLength(100);
                entity.Property(u => u.Role).HasConversion<int>();
            });

            // Seed data
            SeedData(builder);
        }

        private void SeedData(ModelBuilder builder)
        {
            // Seed users
            var adminId = Guid.NewGuid().ToString();
            var organizerId = Guid.NewGuid().ToString();
            var studentId = Guid.NewGuid().ToString();

            builder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Id = adminId,
                    UserName = "admin@campus.edu",
                    Email = "admin@campus.edu",
                    FullName = "Admin User",
                    Role = UserRole.Admin,
                    EmailConfirmed = true,
                    CreatedAt = DateTime.UtcNow,
                    LastLoginAt = DateTime.UtcNow
                },
                new ApplicationUser
                {
                    Id = organizerId,
                    UserName = "organizer@campus.edu",
                    Email = "organizer@campus.edu",
                    FullName = "Event Organizer",
                    Role = UserRole.Organizer,
                    EmailConfirmed = true,
                    CreatedAt = DateTime.UtcNow,
                    LastLoginAt = DateTime.UtcNow
                },
                new ApplicationUser
                {
                    Id = studentId,
                    UserName = "student@campus.edu",
                    Email = "student@campus.edu",
                    FullName = "Student User",
                    Role = UserRole.Student,
                    EmailConfirmed = true,
                    CreatedAt = DateTime.UtcNow,
                    LastLoginAt = DateTime.UtcNow
                }
            );

            // Seed events
            builder.Entity<Event>().HasData(
                new Event
                {
                    Id = 1,
                    Title = "Welcome Back Social",
                    Description = "Join us for an exciting welcome back event with food, games, and networking opportunities for new and returning students.",
                    Date = DateTime.Today.AddDays(7),
                    Time = new TimeSpan(18, 0, 0), // 6:00 PM
                    Location = "Student Center Main Hall",
                    Category = "Social",
                    Organization = "Student Life",
                    Capacity = 200,
                    TicketsIssued = 45,
                    ImageUrl = "/images/events/welcome-social.jpg",
                    OrganizerId = organizerId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Event
                {
                    Id = 2,
                    Title = "Tech Talk: AI in Education",
                    Description = "Explore how artificial intelligence is transforming education and learn about the latest developments in EdTech.",
                    Date = DateTime.Today.AddDays(14),
                    Time = new TimeSpan(14, 0, 0), // 2:00 PM
                    Location = "Computer Science Building Room 101",
                    Category = "Academic",
                    Organization = "Computer Science Department",
                    Capacity = 100,
                    TicketsIssued = 78,
                    ImageUrl = "/images/events/ai-talk.jpg",
                    OrganizerId = organizerId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Event
                {
                    Id = 3,
                    Title = "Campus Movie Night",
                    Description = "Enjoy a free movie screening under the stars. Bring your blankets and snacks!",
                    Date = DateTime.Today.AddDays(21),
                    Time = new TimeSpan(20, 0, 0), // 8:00 PM
                    Location = "Quad Lawn",
                    Category = "Entertainment",
                    Organization = "Campus Activities Board",
                    Capacity = 500,
                    TicketsIssued = 234,
                    ImageUrl = "/images/events/movie-night.jpg",
                    OrganizerId = organizerId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            );
        }
    }
}
