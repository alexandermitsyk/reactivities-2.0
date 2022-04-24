using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.Activities;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Create>());
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(o => o.NoReferrer());
            app.UseXXssProtection(o => o.EnabledWithBlockMode());
            app.UseXfo(o => o.Deny());
            app.UseCsp(o => 
                o.BlockAllMixedContent()
                .StyleSources(s => s.Self().CustomSources(
                    "https://fonts.googleapis.com",
                    "sha256-yChqzBduCCi4o4xdbXRXh4U/t1rP4UUUMJt+rB+ylUI=",
                    "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
                    "sha256-tVFibyLEbUGj+pO/ZSi96c01jJCvzWilvI5Th+wLeGE=",
                    "sha256-yChqzBduCCi4o4xdbXRXh4U/t1rP4UUUMJt+rB+ylUI=",
                    "sha256-r3x6D0yBZdyG8FpooR5ZxcsLuwuJ+pSQ/80YzwXS5IU="
                    ))
                .FontSources(s => s.Self().CustomSources(
                    "https://fonts.gstatic.com", "data:"
                    ))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self().CustomSources(
                    "https://res.cloudinary.com", 
                    "https://www.facebook.com",
                    "https://platform-lookaside.fbsbx.com",
                    "blob:",
                    "data:"
                    ))
                .ScriptSources(s => s.Self().CustomSources(
                    "sha256-qWUQKWiPOKk5ljSucWykeaAPH00bQ6OC3eGZKDksNNk=",
                    "sha256-Jk617GCh2rrvM7dml+IyLYWzgAr33v9Nj0YdS7t94W0=",
                    "sha256-Le5CdUfT/sHr0lxuB9Hw9tdCxNu8xLO1N0agzyUj4fg=",
                    "https://connect.facebook.net"
                    ))
              );

            if (env.IsDevelopment())
            {    
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            } else
            {
                app.Use(async (context, next) =>
                {
                    context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                    await next.Invoke();
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
