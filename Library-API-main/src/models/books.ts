export interface Book{
    id: number; // Unique ID 
    title: string; //title of the book
    year: number; /// publishication year of the book
    isbn: number; //each book has its own isbn and user can search a book suing it
    authorId: number; //author ID
}

export const books: Book[] = [];