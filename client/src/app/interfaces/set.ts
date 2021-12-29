export interface Set {
  id: number;
  title: string;
  description?: string;
  numberOfFlashcards: number;
  side: number; //albo przód albo tył (1 lub 2)
}