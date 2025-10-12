using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using CampusEvents.Models;
using CampusEvents.Data;

namespace CampusEvents.Controllers;

public class EventsController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<EventsController> _logger;

    public EventsController(ApplicationDbContext context, ILogger<EventsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: Events
    public async Task<IActionResult> Index(string? category, string? search, string? sortBy)
    {
        var eventsQuery = _context.Events
            .Include(e => e.Organizer)
            .Where(e => e.Date >= DateTime.Today);

        // Apply filters
        if (!string.IsNullOrEmpty(category))
        {
            eventsQuery = eventsQuery.Where(e => e.Category == category);
        }

        if (!string.IsNullOrEmpty(search))
        {
            eventsQuery = eventsQuery.Where(e => 
                e.Title.Contains(search) || 
                e.Description.Contains(search) || 
                e.Location.Contains(search));
        }

        // Apply sorting
        eventsQuery = sortBy switch
        {
            "date" => eventsQuery.OrderBy(e => e.Date),
            "title" => eventsQuery.OrderBy(e => e.Title),
            "location" => eventsQuery.OrderBy(e => e.Location),
            "capacity" => eventsQuery.OrderByDescending(e => e.Capacity),
            _ => eventsQuery.OrderBy(e => e.Date)
        };

        var events = await eventsQuery.ToListAsync();

        // Get categories for filter dropdown
        var categories = await _context.Events
            .Select(e => e.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();

        ViewBag.Categories = categories;
        ViewBag.SelectedCategory = category;
        ViewBag.SearchTerm = search;
        ViewBag.SortBy = sortBy;

        return View(events);
    }

    // GET: Events/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var eventItem = await _context.Events
            .Include(e => e.Organizer)
            .Include(e => e.Tickets)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (eventItem == null)
        {
            return NotFound();
        }

        return View(eventItem);
    }

    // POST: Events/ClaimTicket/5
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> ClaimTicket(int id)
    {
        var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null)
        {
            return NotFound();
        }

        var userId = User.Identity?.Name;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userId);
        if (user == null)
        {
            return Unauthorized();
        }

        // Check if event is full
        if (eventItem.IsFull)
        {
            TempData["Error"] = "Sorry, this event is full.";
            return RedirectToAction(nameof(Details), new { id });
        }

        // Check if user already has a ticket for this event
        var existingTicket = await _context.Tickets
            .FirstOrDefaultAsync(t => t.EventId == id && t.UserId == user.Id);

        if (existingTicket != null)
        {
            TempData["Error"] = "You already have a ticket for this event.";
            return RedirectToAction(nameof(Details), new { id });
        }

        // Create new ticket
        var ticket = new Ticket
        {
            EventId = id,
            UserId = user.Id,
            TicketCode = GenerateTicketCode(),
            IssuedAt = DateTime.UtcNow
        };

        _context.Tickets.Add(ticket);
        
        // Update event ticket count
        eventItem.TicketsIssued++;
        eventItem.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        TempData["Success"] = "Ticket claimed successfully!";
        return RedirectToAction(nameof(TicketDetails), new { ticketId = ticket.Id });
    }

    // GET: Events/TicketDetails/5
    [Authorize]
    public async Task<IActionResult> TicketDetails(int ticketId)
    {
        var ticket = await _context.Tickets
            .Include(t => t.Event)
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Id == ticketId);

        if (ticket == null)
        {
            return NotFound();
        }

        // Verify ticket belongs to current user
        var userId = User.Identity?.Name;
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userId);
        
        if (user == null || ticket.UserId != user.Id)
        {
            return Unauthorized();
        }

        return View(ticket);
    }

    private string GenerateTicketCode()
    {
        var random = new Random();
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, 8)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }
}
