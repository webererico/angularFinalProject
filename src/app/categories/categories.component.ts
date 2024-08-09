import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoriesDataSource, CategoriesItem } from './categories-datasource';
import { CategoryService } from './category-service.service';
import { lastValueFrom } from 'rxjs';
import { ICategory } from './category-interface';
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
    
  `,
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, FormComponent]
})
export class CategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ICategory>;
  dataSource = new MatTableDataSource<ICategory>();
  showForm = false;
  constructor(private categoryService: CategoryService) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'id', 'description'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.loadCategories();
  }

  // Carregar categorias
  async loadCategories() {
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onNewCategoryClick() {
    this.showForm = true;
  }

  hideForm() {
    this.showForm = false;
    this.loadCategories();
  }

  async onSaveForm(category: ICategory) {
    const novaCategoria = lastValueFrom(this.categoryService.save(category));
    console.log('salvou', novaCategoria );
    this.hideForm();
  }


}
