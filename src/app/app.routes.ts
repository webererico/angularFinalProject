import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { authorizationGuard, RoleGuard } from './authorization.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        canActivate: [authorizationGuard, RoleGuard],
        component: HomeComponent,
        children: [
            {
                path: 'categories',
                component: CategoriesComponent,
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'students',
                component: StudentsComponent
            },
        ]
    },

    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ]
    },


];
