import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Classes/Category';
import { DepartmentService } from '../../Services/DepartmentService';
import { Department } from '../../Classes/Department';
import { ProductService } from '../../Services/product.service';
import { ProductInStock } from '../../Classes/ProductInStock';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'department',
  standalone: true,
  imports: [RouterModule, CommonModule, ProductDetailsComponent],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  // פרמטרים

  categories: Array<Category> = [];

  departmentDetailes: Department = new Department()

  selectedCategoryIds: number[] = [];

  productsWithCategoryId: Array<ProductInStock & { categoryId: number }> = [];

  // אתחול

  constructor(
    public categoryS: CategoryService,
    public activatedR: ActivatedRoute,
    public departmentService: DepartmentService,
    public productS: ProductService) { }

  ngOnInit(): void {

    this.activatedR.params.subscribe(params => {
      const id = +params['departmentId'];

      this.categoryS.GetbyDepartmentId(id).subscribe(c => {
        this.categories = c;

        this.productsWithCategoryId = [];

        this.categories.forEach(category => {
          this.productS.GetbyCategoryId(category.id).subscribe(pList => {
            const withCategory = pList.map(p => {
              const pis = new ProductInStock(p.id, p.product, p.quantity) as ProductInStock & { categoryId: number };
              pis.categoryId = category.id;
              return pis;
            });
            this.productsWithCategoryId.push(...withCategory);
          });
        });


      });

      this.departmentDetailes = this.departmentService.allDepartments.find(d => d.id == id)!;

    });

  }

  // פונקציות

  get productsToDisplay() {
    if (this.selectedCategoryIds.length === 0) {
      return this.productsWithCategoryId;
    }
    return this.productsWithCategoryId.filter(p =>
      this.selectedCategoryIds.includes(p.categoryId)
    );
  }

  onCategoryToggle(categoryId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.selectedCategoryIds.includes(categoryId)) {
        this.selectedCategoryIds.push(categoryId);
      }
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== categoryId);
    }
  }

  getProductCountForCategory(categoryId: number): number {
    return this.productsWithCategoryId.filter(p => p.categoryId === categoryId).length;
  }

}
