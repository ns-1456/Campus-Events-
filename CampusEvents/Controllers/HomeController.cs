using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CampusEvents.Models;
using CampusEvents.Data;

namespace CampusEvents.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ApplicationDbContext _context;

    public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        try
        {
            // Get featured events (upcoming events with good attendance)
            var featuredEvents = await _context.Events
                .Where(e => e.Date >= DateTime.Today)
                .OrderBy(e => e.Date)
                .Take(6)
                .ToListAsync();

            // Get event statistics
            var totalEvents = await _context.Events.CountAsync();
            var upcomingEvents = await _context.Events.CountAsync(e => e.Date >= DateTime.Today);
            var totalTickets = await _context.Tickets.CountAsync();
            var totalUsers = await _context.Users.CountAsync();

            ViewBag.FeaturedEvents = featuredEvents;
            ViewBag.TotalEvents = totalEvents;
            ViewBag.UpcomingEvents = upcomingEvents;
            ViewBag.TotalTickets = totalTickets;
            ViewBag.TotalUsers = totalUsers;

            return View();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in HomeController.Index");
            
            // Fallback values
            ViewBag.FeaturedEvents = new List<Event>();
            ViewBag.TotalEvents = 0;
            ViewBag.UpcomingEvents = 0;
            ViewBag.TotalTickets = 0;
            ViewBag.TotalUsers = 0;
            
            return View();
        }
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
