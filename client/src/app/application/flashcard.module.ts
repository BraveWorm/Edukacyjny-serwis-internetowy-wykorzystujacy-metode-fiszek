import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardComponent } from './flashcard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolsModule } from '../materials-module/materials-module.module';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './main-page/home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './authentication/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreateSetComponent } from './pages/create-set/create-set.component';
import { LoggedInComponent } from './main-page/logged-in/logged-in.component';
import { GameComponent } from './pages/game/game.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

  
@NgModule({
  declarations: [
    FlashcardComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    CreateSetComponent,
    RegisterComponent,
    LoggedInComponent,
    GameComponent,
    EditProfileComponent,
    DialogComponent,
    ProfileComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    //Our tools modules
    ToolsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
    }),
  ],
  exports: [
    FlashcardComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
  ],
  
})
export class FlashcardModule {}
