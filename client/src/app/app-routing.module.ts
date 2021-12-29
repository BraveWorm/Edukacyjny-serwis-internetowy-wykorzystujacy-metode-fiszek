import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './application/authentication/register/register.component';
import { LoginComponent } from './application/authentication/login/login.component';

import { HomeComponent } from './application/main-page/home/home.component';
import { LoggedInComponent } from './application/main-page/logged-in/logged-in.component';
import { ProfileComponent } from './application/pages/profile/profile.component';
import { NotFoundComponent } from './application/pages/not-found/not-found.component';
import { CreateSetComponent } from './application/pages/create-set/create-set.component';
import { GameComponent } from './application/pages/game/game.component';
import { EditProfileComponent } from './application/pages/edit-profile/edit-profile.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]},
  { path: 'game/:id', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'logged-in', component: LoggedInComponent, canActivate: [AuthGuard] },
  { path: 'create-set', component: CreateSetComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
