using AutoMapper;

/// <summary>
/// Mapper for 'Cuenta' DTO - Entity
/// </summary>

public class CuentaProfile : Profile
{
    public CuentaProfile()
    {
        CreateMap<CuentaDTO, CuentaEntity>();
        CreateMap<CuentaEntity, CuentaDTO>();
        CreateMap<BaseCuentaDTO, CuentaEntity>();
        CreateMap<CuentaEntity, BaseCuentaDTO>();
    }
}
