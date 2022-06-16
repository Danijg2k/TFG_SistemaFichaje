using AutoMapper;

/// <summary>
/// Mapper usado para 'Empleado' DTO - Entity
/// </summary>

public class EmpleadoProfile : Profile
{
    public EmpleadoProfile()
    {
        CreateMap<EmpleadoDTO, EmpleadoEntity>();
        CreateMap<EmpleadoEntity, EmpleadoDTO>();
        CreateMap<BaseEmpleadoDTO, EmpleadoEntity>();
        CreateMap<EmpleadoEntity, BaseEmpleadoDTO>();
    }
}
