import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { AuthService } from "./services/auth/auth.service"
import { Injectable, Inject, Optional } from "@angular/core"
import { FlashcardService } from "./services/auth/flashcard-service/flashcard.service";
import { FlashcardComponent } from "./application/flashcard.component";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private flashcardService: FlashcardService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(req);
  }
}