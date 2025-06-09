using Core;
using Core.Dao;
using Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DataRepository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProjectContext _dbContext;
        public ProductRepository(ProjectContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Product> getById(int SKU)
        {
            return await _dbContext.Products.Where(x => x.SKU == SKU).FirstOrDefaultAsync();
        }

    }
}
