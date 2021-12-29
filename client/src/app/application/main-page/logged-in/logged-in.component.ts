import { OnInit, Component } from '@angular/core';
import { FlashcardService } from 'src/app/services/auth/flashcard-service/flashcard.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css'],
})
export class LoggedInComponent implements OnInit {
  mySets: any[] = [];
  filmIcon = faTrashAlt;
  myStats: any[] = [];
  tmp: boolean | undefined;
  constructor(private service: FlashcardService) { }

  ngOnInit(): void {
   
    this.service.getMyFlashacrdSets().subscribe((val) => {
      this.mySets = val;
    })
  }

  onDelete(setId: number) {
    this.service.removeSet(setId).subscribe((res) => {
      this.ngOnInit();
    });
  }
}


