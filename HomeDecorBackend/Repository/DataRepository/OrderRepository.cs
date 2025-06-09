using Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DataRepository
{

    public class OrderRepository : IOrderRepository
    {

        private readonly ProjectContext _dbContext;
        public OrderRepository(ProjectContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Core.Dao.Order> addOrderAsync(Core.Dao.Order newOrder)
        {
            try
            {
                Console.WriteLine("\n\n\n i am here \n\n\n\n\n\n");
                Console.WriteLine(newOrder.id);
                await _dbContext.Orders.AddAsync(newOrder);
                int x = await _dbContext.SaveChangesAsync();
                if (x > 0)
                    return newOrder;
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine("___________________________________________________");
                Console.WriteLine("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"); Console.WriteLine(e.Message);
                Console.WriteLine(e.InnerException.Message);
                Console.WriteLine("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"); Console.WriteLine(e.Message);
                Console.WriteLine("___________________________________________________");
                throw e;

            }
        }


    }
}
