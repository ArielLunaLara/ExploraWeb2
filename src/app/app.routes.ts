import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { LoginPage } from './pages/login-page/login-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

// Las rutas deben coincidir exactamente (incluyendo mayúsculas) con los routerLink de app.html
export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomePage},
    {path: 'catalog', component: CatalogPage},
    {path: 'login', component: LoginPage},
    {path: 'register', loadComponent: () => import('./pages/register-page/register-page').then(m => m.RegisterPage)},
    {path: 'admin', loadComponent: () => import('./pages/admin-page/admin-page').then(m => m.AdminPage)},
    {path: '**', component: NotFoundPage},
];
