using Core.Dao;
using Core.IRepositories;
using Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DataService
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        private readonly IProductRepository _productRepository;

        private readonly IProductInStockService _productInStockServices;


        public OrderService(IOrderRepository orderRepository, IProductInStockService productInStockServices, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _productInStockServices = productInStockServices;
            _productRepository = productRepository;
        }

        public async Task<Order> addOrderAsync(Order newOrder)
        {

            try
            {
                foreach (ProductOrdered p in newOrder.ordered)
                {
                    try
                    {
                        p.Product = _productRepository.getById(p.ProductSku).Result;
                        await _productInStockServices.decreaseStock(p.Product.SKU, p.Quantity);
                    }
                    catch (Exception ex)
                    {
                        if (ex.Message.Equals("Not enough in stock"))
                            newOrder.ordered.Remove(p);
                    }
                }

                Order updateOrder = await _orderRepository.addOrderAsync(newOrder);
                return updateOrder;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
