using AutoMapper;
using WebApi.Helpers;
// Para que Swagger permita introducir headers
using WebApplication1.Filters;
// 

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

        // Para Swagger
        services.AddSwaggerGen(options =>
        {
            // Para Headers extra
            options.OperationFilter<HeadersSwagger>();
            // 
            options.AddSecurityDefinition("bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                Description = "JWT Authorization header using the Bearer scheme."
            });
            options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
                    {
                          new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                            {
                                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                                {
                                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                                    Id = "bearer"
                                }
                            },
                            new string[] {}
                    }
                });
        });
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
        services.AddSingleton<ISesionEmpService, SesionEmpService>();


    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            // Para Swagger
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


        //app.UseHttpsRedirection();
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