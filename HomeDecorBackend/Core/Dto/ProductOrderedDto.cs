﻿using Core.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dto
{
    public class ProductOrderedDto
    {
        public int Id { get; set; }
        //public ProductDto Product { get; set; }
        public int ProductSku { get; set; }
        public int Quantity { get; set; }
    }
}
