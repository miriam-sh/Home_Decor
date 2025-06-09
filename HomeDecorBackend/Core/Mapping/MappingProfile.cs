using AutoMapper;
using Core.Dao;
using Core.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();

            CreateMap<Department, DepartmentDto>().ReverseMap();

            CreateMap<Product, ProductDto>().ReverseMap();

            CreateMap<Order, OrderDto>().ReverseMap();

            CreateMap<ProductInStock, ProductInStockDto>().ReverseMap();

            //CreateMap<ProductOrdered, ProductOrderedDto>().ReverseMap();
            CreateMap<ProductOrderedDto, ProductOrdered>()
            .ForMember(dest => dest.Product, opt => opt.Ignore());
            CreateMap<ProductOrdered, ProductOrderedDto>()
                .ForMember(dest => dest.ProductSku, opt => opt.MapFrom(src => src.Product.SKU));
        }
    }
}
