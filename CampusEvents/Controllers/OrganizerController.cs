using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using CampusEvents.Models;
using CampusEvents.Data;
using System.ComponentModel.DataAnnotations;

namespace CampusEvents.Controllers;

[Authorize(Roles = "Organizer")]
public class OrganizerController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ILogger<OrganizerController> _logger;

    public OrganizerController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, ILogger<OrganizerController> logger)
    {
        _context = context;
        _userManager = userManager;
        _logger = logger;
    }

    // GET: Organizer/Dashboard
    public async Task<IActionResult> Dashboard()
    {
        var userId = User.Identity?.Name;
        if (string.IsNullOrEmpty(userId))
        {
            return RedirectToAction(nameof(AccountController.Login), "Account");
        }

        var user = await _userManager.FindByNameAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        // Get organizer's events
        var events = await _context.Events
            .Where(e => e.OrganizerId == user.Id)
            .OrderByDescending(e => e.CreatedAt)
            .ToListAsync();

        // Get statistics
        var totalEvents = events.Count;
        var upcomingEvents = events.Count(e => e.Date >= DateTime.Today);
        var totalAttendees = await _context.Tickets
            .Where(t => events.Select(e => e.Id).Contains(t.EventId))
            .CountAsync();

        var viewModel = new OrganizerDashboardViewModel
        {
            User = user,
            Events = events,
            TotalEvents = totalEvents,
            UpcomingEvents = upcomingEvents,
            TotalAttendees = totalAttendees
        };

        return View(viewModel);
    }

    // GET: Organizer/CreateEvent
    public IActionResult CreateEvent()
    {
        return View(new CreateEventViewModel());
    }

    // POST: Organizer/CreateEvent
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateEvent(CreateEventViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var userId = User.Identity?.Name;
        if (string.IsNullOrEmpty(userId))
        {
            return RedirectToAction(nameof(AccountController.Login), "Account");
        }

        var user = await _userManager.FindByNameAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        var eventItem = new Event
        {
            Title = model.Title,
            Description = model.Description,
            Date = model.Date,
            Time = model.Time,
            Location = model.Location,
            Category = model.Category,
            Organization = model.Organization,
            Capacity = model.Capacity,
            ImageUrl = model.ImageUrl,
            OrganizerId = user.Id,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Events.Add(eventItem);
        await _context.SaveChangesAsync();

        TempData["Success"] = "Event created successfully!";
        return RedirectToAction(nameof(Dashboard));
    }

    // GET: Organizer/EditEvent/5
    public async Task<IActionResult> EditEvent(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var userId = User.Identity?.Name;
        var user = await _userManager.FindByNameAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        var eventItem = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == id && e.OrganizerId == user.Id);

        if (eventItem == null)
        {
            return NotFound();
        }

        var model = new EditEventViewModel
        {
            Id = eventItem.Id,
            Title = eventItem.Title,
            Description = eventItem.Description,
            Date = eventItem.Date,
            Time = eventItem.Time,
            Location = eventItem.Location,
            Category = eventItem.Category,
            Organization = eventItem.Organization,
            Capacity = eventItem.Capacity,
            ImageUrl = eventItem.ImageUrl
        };

        return View(model);
    }

    // POST: Organizer/EditEvent/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EditEvent(int id, EditEventViewModel model)
    {
        if (id != model.Id)
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var userId = User.Identity?.Name;
        var user = await _userManager.FindByNameAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        var eventItem = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == id && e.OrganizerId == user.Id);

        if (eventItem == null)
        {
            return NotFound();
        }

        eventItem.Title = model.Title;
        eventItem.Description = model.Description;
        eventItem.Date = model.Date;
        eventItem.Time = model.Time;
        eventItem.Location = model.Location;
        eventItem.Category = model.Category;
        eventItem.Organization = model.Organization;
        eventItem.Capacity = model.Capacity;
        eventItem.ImageUrl = model.ImageUrl;
        eventItem.UpdatedAt = DateTime.UtcNow;

        try
        {
            _context.Update(eventItem);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EventExists(eventItem.Id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        TempData["Success"] = "Event updated successfully!";
        return RedirectToAction(nameof(Dashboard));
    }

    // POST: Organizer/DeleteEvent/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var userId = User.Identity?.Name;
        var user = await _userManager.FindByNameAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        var eventItem = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == id && e.OrganizerId == user.Id);

        if (eventItem == null)
        {
            return NotFound();
        }

        _context.Events.Remove(eventItem);
        await _context.SaveChangesAsync();

        TempData["Success"] = "Event deleted successfully!";
        return RedirectToAction(nameof(Dashboard));
    }

    // GET: Organizer/Attendees/5
    public async Task<IActionResult> Attendees(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var userId = User.Identity?.Name;
        var user = await _userManager.FindByNameAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        var eventItem = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == id && e.OrganizerId == user.Id);

        if (eventItem == null)
        {
            return NotFound();
        }

        var attendees = await _context.Tickets
            .Include(t => t.User)
            .Where(t => t.EventId == id)
            .OrderBy(t => t.IssuedAt)
            .ToListAsync();

        var viewModel = new AttendeesViewModel
        {
            Event = eventItem,
            Attendees = attendees
        };

        return View(viewModel);
    }

    private bool EventExists(int id)
    {
        return _context.Events.Any(e => e.Id == id);
    }
}

// View Models
public class OrganizerDashboardViewModel
{
    public ApplicationUser User { get; set; }
    public List<Event> Events { get; set; }
    public int TotalEvents { get; set; }
    public int UpcomingEvents { get; set; }
    public int TotalAttendees { get; set; }
}

public class CreateEventViewModel
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; }

    [Required]
    [StringLength(1000)]
    public string Description { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    [Required]
    [DataType(DataType.Time)]
    public TimeSpan Time { get; set; }

    [Required]
    [StringLength(200)]
    public string Location { get; set; }

    [Required]
    [StringLength(50)]
    public string Category { get; set; }

    [Required]
    [StringLength(100)]
    public string Organization { get; set; }

    [Required]
    [Range(1, 10000)]
    public int Capacity { get; set; }

    [StringLength(500)]
    [Url]
    public string? ImageUrl { get; set; }
}

public class EditEventViewModel
{
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; }

    [Required]
    [StringLength(1000)]
    public string Description { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    [Required]
    [DataType(DataType.Time)]
    public TimeSpan Time { get; set; }

    [Required]
    [StringLength(200)]
    public string Location { get; set; }

    [Required]
    [StringLength(50)]
    public string Category { get; set; }

    [Required]
    [StringLength(100)]
    public string Organization { get; set; }

    [Required]
    [Range(1, 10000)]
    public int Capacity { get; set; }

    [StringLength(500)]
    [Url]
    public string? ImageUrl { get; set; }
}

public class AttendeesViewModel
{
    public Event Event { get; set; }
    public List<Ticket> Attendees { get; set; }
}
