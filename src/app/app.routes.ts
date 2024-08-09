import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

    {
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },

];
