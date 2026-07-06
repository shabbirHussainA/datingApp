using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UserDto
{
    [Required]
    public string Id { get; set; } = string.Empty;
    [Required]
    public string DisplayName { get; set; } = string.Empty;
    [Required]
    public string Email { get; set; } = string.Empty;
    public string? imageUrl { get; set; }
    [Required]
    public string Token { get; set; } = string.Empty;    
}
