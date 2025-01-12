var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});


var app = builder.Build();

app.MapDefaultControllerRoute();

app.Urls.Add("http://localhost:5001");

app.UseRouting();

app.UseCors("AllowAll");

app.UseEndpoints(endpoints => endpoints.MapControllers());

app.Run();
