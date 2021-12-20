import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard, UserGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'chat',
    canActivate: [UserGuard],
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
