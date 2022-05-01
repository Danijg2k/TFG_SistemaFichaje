using System.Data.Entity;

public class FichajeContext : DbContext
{
    public FichajeContext(string connectionString) : base(connectionString)
    { }

    public DbSet<EmpleadoEntity> Empleados { get; set; }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
