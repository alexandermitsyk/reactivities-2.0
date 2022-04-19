using Application.Followers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Folow(string username)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUsername = username }));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> Folowings(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query{ Username = username, Predicate = predicate }));;
        }
    }
}
