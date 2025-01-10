using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Admin.Data;
using Services.Admin.Models.Dto;
using Services.Admin.Models;

namespace Services.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminAPIController : ControllerBase
    {
        private readonly AppDbContext _db;
        public AdminAPIController(AppDbContext context)
        {
            _db = context;
        }

        // GET: api/AdminAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDto>>> GetAdmins()
        {
            var admins = await _db.Admin
                .Select(a => new AdminDto
                {
                    AdminId = a.AdminId,
                    Username = a.Username,
                    Email = a.Email,
                    // Avoid returning Password for security reasons
                })
                .ToListAsync();

            return Ok(admins);
        }

        // GET: api/AdminAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminDto>> GetAdmin(int id)
        {
            var admin = await _db.Admin.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            var adminDto = new AdminDto
            {
                AdminId = admin.AdminId,
                Username = admin.Username,
                Email = admin.Email,
                // Avoid returning Password for security reasons
            };

            return Ok(adminDto);
        }

        // POST: api/AdminAPI
        [HttpPost]
        public async Task<ActionResult<AdminDto>> PostAdmin(AdminDto adminDto)
        {
            var admin = new Admins
            {
                Username = adminDto.Username,
                Email = adminDto.Email,
                Password = adminDto.Password // You might want to hash the password before saving it
            };

            _db.Admin.Add(admin);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdmin), new { id = admin.AdminId }, adminDto);
        }

        // PUT: api/AdminAPI/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmin(int id, AdminDto adminDto)
        {
            if (id != adminDto.AdminId)
            {
                return BadRequest();
            }

            var admin = await _db.Admin.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            // Update the properties
            admin.Username = adminDto.Username;
            admin.Email = adminDto.Email;
            admin.Password = adminDto.Password; // You might want to hash the password before saving it

            _db.Entry(admin).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/AdminAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var admin = await _db.Admin.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            _db.Admin.Remove(admin);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/AdminAPI/Login
        [HttpPost("Login")]
        public async Task<ActionResult<int>> LoginAdmin(AdminDto loginDto)
        {
            var admin = await _db.Admin.FirstOrDefaultAsync(a => a.Email == loginDto.Email && a.Password == loginDto.Password);

            if (admin != null)
            {
                // If admin exists with the provided email and password, return 1
                return Ok(1);
            }
            else
            {
                // If admin does not exist with the provided email and password, return 0
                return Ok(0);
            }
        }


        private bool AdminExists(int id)
        {
            return _db.Admin.Any(e => e.AdminId == id);
        }
    }
}

