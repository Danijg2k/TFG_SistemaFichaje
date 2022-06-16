using AutoMapper;

/// <summary>
/// Mapper usado para 'Sesion' DTO - Entity
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