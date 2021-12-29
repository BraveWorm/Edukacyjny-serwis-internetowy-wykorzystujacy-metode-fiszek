import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { FlashcardService } from 'src/app/services/auth/flashcard-service/flashcard.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  durationInSeconds = 0.5;
  setInfo: any;
  myFlashcard: any[] = [];
  currentIndex = 0;
  myStats: any[] = [];
  tmp = false;
  dataForm = this.fb.group({
    front: [''],
    back: [''],
  });

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private flashcardService: FlashcardService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
) 
  {
    this.setInfo = this.router.getCurrentNavigation()?.extras?.state?.data;
  }

  async ngOnInit(): Promise<any> {
    this.dataForm.controls.back.setValue('');
    this.myFlashcard = await this.flashcardService.test(
      Number(this.route.snapshot.paramMap.get('id'))
    );
    // this.currentIndex = 0;
    this.setFormValues(this.currentIndex);

    this.statistics();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog-container',
      data: { def:this.myFlashcard[this.currentIndex].front, odp: this.myFlashcard[this.currentIndex].back },
    });
  }

  getReset() {
    this.flashcardService
      .reset(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe((res) => {
        this.ngOnInit();
      });
    this.tmp = false;
  }

  statistics(): void {
    this.flashcardService
      .stats(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe((myStats) => (this.myStats = myStats));
  }

  getNextSet(): void {
    this.ngOnInit();
    if (this.myFlashcard.length > 0) {
      const index = Math.floor(Math.random() * this.myFlashcard.length);
      this.currentIndex = index;
      this.setFormValues(index);
    } else {
      this.tmp = true;
    }
  }

  setFormValues(index: number): void {
    if (this.myFlashcard.length > 0) {
      this.dataForm.controls.front.setValue(this.myFlashcard[index].front);
    } else {
      this.tmp = true;
    }
  }

  openSnackBar() {
    this._snackBar.open(
      'Podpowiedź: ' + this.myFlashcard[this.currentIndex].back,
      '',
      {
        duration: 800,
      }
    );
  }
  openSnackBar2() {
    this._snackBar.open('Super! Dobra odpowiedź', '', {
      duration: 1000,
      panelClass: ['green-snackbar'],
    });
  }

  checkValidity(): void {
    if (this.myFlashcard.length > 0) {
      let vald;
      if (
        this.dataForm.controls.back.value ===
        this.myFlashcard[this.currentIndex].back
      ) {
        vald = true;
      } else {
        vald = false;
      }
      if (
        this.dataForm.controls.back.value ===
        this.myFlashcard[this.currentIndex].back
      ) {
        console.log(this.myFlashcard[this.currentIndex].id);
        this.flashcardService.sprawdz(
          this.myFlashcard[this.currentIndex].id,
          vald
        );
        this.openSnackBar2();
        this.getNextSet();
      } else {
        this.flashcardService.sprawdz(
          this.myFlashcard[this.currentIndex].id,
          vald
        );
        this.openDialog();
        this.getNextSet();
      }
    } else {
      console.log('brak fiszek juz');
    }
  }
}