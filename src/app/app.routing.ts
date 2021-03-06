//IMPORTS

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT COMPENENTS
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent} from './components/user-edit/user-edit.component';
import { CategoryNewComponent} from './components/category-new/category-new.component';
import { CategoryWorkNewComponent} from './components/category-work-new/category-work-new.component';
import { PostNewComponent} from './components/post-new/post-new.component';
import { PostDetailComponent} from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CvComponent } from './components/cv-component/cv-component.component';

import {IdentityGuard} from './services/identity.guard';

//DEFINIR LAS RUTAS
const appRoutes:Routes = [
   {path: '',component: CvComponent},
   {path: 'inicio',component: HomeComponent},
   {path: 'login',component: LoginComponent},
   {path: 'logout/:sure',component: LoginComponent},
   {path: 'registro',component: RegisterComponent},
   {path: 'ajustes',component: UserEditComponent, canActivate: [IdentityGuard]},
   {path: 'crear-post',component: PostNewComponent,canActivate: [IdentityGuard]},
   {path: 'crear-categoria',component: CategoryNewComponent,canActivate: [IdentityGuard]},
   {path: 'crear-categoria-work',component: CategoryWorkNewComponent,canActivate: [IdentityGuard]},
   {path: 'entrada/:id',component: PostDetailComponent},
   {path: 'editar-entrada/:id',component: PostEditComponent, canActivate: [IdentityGuard]},
   {path: 'categoria/:id',component: CategoryDetailComponent},
   {path: 'perfil/:id',component: ProfileComponent, canActivate: [IdentityGuard]},
   {path: 'cv',component: CvComponent},
   {path: '**',component: ErrorComponent}
];

// EXPORTAR CONFIGURACION

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);