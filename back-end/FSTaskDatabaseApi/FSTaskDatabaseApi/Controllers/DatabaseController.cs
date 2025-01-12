using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace FSTaskDatabaseApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatabaseController : ControllerBase
    {
        private readonly string filePath = "database.json";

        [HttpGet]
        public IActionResult Get()
        {
            if (!System.IO.File.Exists(filePath))
                return NotFound("JSON file not found.");

            var jsonData = System.IO.File.ReadAllText(filePath);
            var items = JsonSerializer.Deserialize<List<Item>>(jsonData);

            return Ok(items);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Item newItem)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var items = new List<Item>();
            if (System.IO.File.Exists(filePath))
            {
                var jsonData = System.IO.File.ReadAllText(filePath);
                items = JsonSerializer.Deserialize<List<Item>>(jsonData);
            }

            newItem.Id = items.Any() ? items.Max(i => i.Id) + 1 : 1;
            items.Add(newItem);

            var updatedJson = JsonSerializer.Serialize(items, new JsonSerializerOptions {WriteIndented = true});
            System.IO.File.WriteAllText(filePath, updatedJson);

            return CreatedAtAction(nameof(Get), new { id = newItem.Id }, newItem);
        }
    }

    public class Item
    {
        public int Id { get; set; }
        public float[]? Addends { get; set; }
        public float Total { get; set; }
    }
}
