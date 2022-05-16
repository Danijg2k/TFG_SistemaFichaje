using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;

public interface ILoginService
{
    public EmpleadoDTO GetByUser(String user);

}