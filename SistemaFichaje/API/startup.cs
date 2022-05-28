using AutoMapper;
using WebApi.Helpers;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        // La segunda parte (NewtonsoftJson) es poder hacer Patch utilizando la clase 'JsonPatchDocument'
        services.AddControllersWithViews().AddNewtonsoftJson();

        // Para utilizar un solo context sin problemas cambiamos -> 'AddSingleton' por 'AddTransient' en la siguiente línea
        services.AddTransient<FichajeContext>(_ =>
            new FichajeContext(Configuration.GetConnectionString("DefaultConnection")));

        // Cosa 1 de 2 añadida para Swagger
        services.AddSwaggerGen();
        //

        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new EmpleadoProfile());
            mc.AddProfile(new SesionProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        services.AddSingleton<IEmpleadoService, EmpleadoService>();
        services.AddSingleton<ISesionService, SesionService>();
        services.AddSingleton<ILoginService, LoginService>();


    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            // Cosa 2 de 2 añadida para Swagger
            app.UseSwagger();
            app.UseSwaggerUI();
            //
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseMiddleware<JwtMiddleware>();

        app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());


        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });
    }
}