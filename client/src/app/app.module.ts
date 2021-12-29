import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ApplicationModule, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FlashcardModule } from "./application/flashcard.module";
import { ToolsModule } from "./materials-module/materials-module.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from "./services/auth/auth.service";
import { UniversalAppInterceptor } from "./UniversalAppInterceptor";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //Angular Modules
    BrowserModule,
    HttpClientModule,
    //Our application module
    FlashcardModule,
    FontAwesomeModule,

  ],
  providers: [
    AuthService, // get the token from here
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalAppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
