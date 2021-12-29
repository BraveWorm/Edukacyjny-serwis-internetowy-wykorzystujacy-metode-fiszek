import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { FlashcardService } from 'src/app/services/auth/flashcard-service/flashcard.service';
import {Location} from '@angular/common';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.css']
})
export class CreateSetComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private flashcardService: FlashcardService, private location: Location) { }
 trashIcon = faTrashAlt;
  dataForm = this.formBuilder.group({
    setTitle:[''],
    setDescription:[''],
    Flashcards:this.formBuilder.array([
      this.formBuilder.group({
        front:[''],
        back:['']
      })
    ])

  })


  get Flashcards(): FormArray
  {
    return (this.dataForm.get('Flashcards') as unknown) as FormArray
  }

  addNewCart(): void
  {
    this.Flashcards.push(this.formBuilder.group(
      {
        front:[''],
        back:['']
      }
      ))
  }

  removeCard(cartIndex: number):void
  {
    this.Flashcards.removeAt(cartIndex);
  }

  uploadMySet():void
  {
    this.flashcardService.postMyFlashcardSet(this.dataForm.getRawValue()).subscribe()
    this.location.back()
  }


  ngOnInit(): void {
  }

}
