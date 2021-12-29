export interface Flashcard {
  id: number;
  front: string;
  back: string;
  correctNumber: number; //liczba poprawnych (od 1 do 5)
}