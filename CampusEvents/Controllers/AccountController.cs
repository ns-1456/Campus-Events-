using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;
using CampusEvents.Models;
using CampusEvents.Data;
using Microsoft.EntityFrameworkCore;

namespace CampusEvents.Controllers;

public class AccountController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ILogger<AccountController> _logger;
    private readonly ApplicationDbContext _context;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ILogger<AccountController> logger,
        ApplicationDbContext context)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
        _context = context;
    }

    // GET: Account/Login
    public IActionResult Login(string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    // POST: Account/Login
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model, string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;

        if (ModelState.IsValid)
        {
            var result = await _signInManager.PasswordSignInAsync(
                model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    user.LastLoginAt = DateTime.UtcNow;
                    await _userManager.UpdateAsync(user);
                }

                _logger.LogInformation("User logged in.");
                return RedirectToLocal(returnUrl);
            }

            if (result.IsLockedOut)
            {
                _logger.LogWarning("User account locked out.");
                ModelState.AddModelError(string.Empty, "Account locked out.");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            }
        }

        return View(model);
    }

    // GET: Account/Register
    public IActionResult Register(string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    // POST: Account/Register
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model, string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;

        if (ModelState.IsValid)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = model.FullName,
                Role = model.Role,
                CreatedAt = DateTime.UtcNow,
                LastLoginAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");
                
                await _signInManager.SignInAsync(user, isPersistent: false);
                return RedirectToLocal(returnUrl);
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        return View(model);
    }

    // POST: Account/Logout
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        _logger.LogInformation("User logged out.");
        return RedirectToAction(nameof(HomeController.Index), "Home");
    }

    // GET: Account/AccessDenied
    public IActionResult AccessDenied()
    {
        return View();
    }

    // GET: Account/Profile
    [Authorize]
    public async Task<IActionResult> Profile()
    {
        var userId = User.Identity?.Name;
        if (string.IsNullOrEmpty(userId))
        {
            return RedirectToAction(nameof(Login));
        }

        var user = await _userManager.FindByNameAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        // Get user's tickets with events
        var tickets = await _context.Tickets
            .Include(t => t.Event)
            .Where(t => t.UserId == user.Id)
            .OrderByDescending(t => t.IssuedAt)
            .ToListAsync();

        // Get upcoming events (user has tickets for)
        var upcomingEvents = tickets
            .Where(t => t.Event.Date >= DateTime.Today)
            .Select(t => t.Event)
            .Distinct()
            .OrderBy(e => e.Date)
            .ToList();

        // Get past events (user has tickets for)
        var pastEvents = tickets
            .Where(t => t.Event.Date < DateTime.Today)
            .Select(t => t.Event)
            .Distinct()
            .OrderByDescending(e => e.Date)
            .ToList();

        var viewModel = new ProfileViewModel
        {
            User = user,
            Tickets = tickets,
            UpcomingEvents = upcomingEvents,
            PastEvents = pastEvents,
            TotalTickets = tickets.Count,
            UpcomingTickets = tickets.Count(t => t.Event.Date >= DateTime.Today),
            PastTickets = tickets.Count(t => t.Event.Date < DateTime.Today)
        };

        return View(viewModel);
    }

    private IActionResult RedirectToLocal(string? returnUrl)
    {
        if (Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }
        else
        {
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }
    }
}

// View Models
public class LoginViewModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    [Display(Name = "Remember me?")]
    public bool RememberMe { get; set; }
}

public class RegisterViewModel
{
    [Required]
    [StringLength(100)]
    [Display(Name = "Full Name")]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [Display(Name = "Email")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; } = string.Empty;

    [DataType(DataType.Password)]
    [Display(Name = "Confirm password")]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; } = string.Empty;

    [Required]
    [Display(Name = "Role")]
    public UserRole Role { get; set; } = UserRole.Student;
}

// Profile ViewModel
public class ProfileViewModel
{
    public ApplicationUser User { get; set; } = new();
    public List<Ticket> Tickets { get; set; } = new();
    public List<Event> UpcomingEvents { get; set; } = new();
    public List<Event> PastEvents { get; set; } = new();
    public int TotalTickets { get; set; }
    public int UpcomingTickets { get; set; }
    public int PastTickets { get; set; }
}
