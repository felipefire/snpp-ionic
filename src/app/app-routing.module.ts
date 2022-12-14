import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  },
  {
    path: 'autores',
    loadChildren: () => import('./autores/autor.module').then( m => m.AutoresPageModule)
  },
  {
    path: 'tecnicaturas',
    loadChildren: () => import('./tecnicaturas/tecnicaturas.module').then( m => m.TecnicaturasPageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/usuario.module').then( m => m.UsuarioPageModule)
  },
  
  {
    path: 'cohorte',
    loadChildren: () => import('./cohorte/cohorte.module').then( m => m.CohortePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
