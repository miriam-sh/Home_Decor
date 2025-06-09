using Core.Dao;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dto
{
    public class OrderDto
    {

        public int id { get; set; }

        public DateTime orderDate { get; set; }

        public string customerFirstName { get; set; }

        public string customerLastName { get; set; }

        public string phone { get; set; }

        public string customerEmail { get; set; }

        public List<ProductOrderedDto> ordered { get; set; }
    }
}
