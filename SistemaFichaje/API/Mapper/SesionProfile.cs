using AutoMapper;

/// <summary>
/// Mapper for 'Sesion' DTO - Entity
/// </summary>

public class SesionProfile : Profile
{
    public SesionProfile()
    {
        CreateMap<SesionDTO, SesionEntity>();
        CreateMap<SesionEntity, SesionDTO>();
        CreateMap<BaseSesionDTO, SesionEntity>();
        CreateMap<SesionEntity, BaseSesionDTO>();
    }
}
