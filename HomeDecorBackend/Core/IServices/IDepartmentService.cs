﻿using Core.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IService
{
    public interface IDepartmentService
    {
        Task<List<Department>>? GetAll();
    }
}
