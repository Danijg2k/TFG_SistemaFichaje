class SingletonUser
{
    private readonly static SingletonUser _instance = new SingletonUser();
    private string email;

    private SingletonUser()
    {
        this.email = "";
    }

    public static SingletonUser getInstance()
    {
        return _instance;
    }

    public string getEmail()
    {
        return this.email;
    }

    public void setEmail(string email)
    {
        this.email = email;
    }
}
