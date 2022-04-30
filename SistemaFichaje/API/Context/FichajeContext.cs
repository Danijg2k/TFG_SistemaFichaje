using System.Data.Entity;

public class FichajeContext : DbContext
{
    public FichajeContext(string connectionString) : base(connectionString)
    { }


    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
