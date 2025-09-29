import { Router, Request, Response } from 'express';
import { authors, Author } from '../models/author';

// Define Book interface and in-memory array
export interface Book {
    id: number;
    title: string;
    year: number;
    authorId: number; // must reference a valid author
}

export const books: Book[] = [];

const router = Router();
// this is where we create the books
router.post('/', (req: Request, res: Response) => {
    const { title, year, authorId } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!year) return res.status(400).json({ error: "Year is required" });
    if (!authorId) return res.status(400).json({ error: "authorId is required" });

    // Check if author exists
    const author = authors.find(a => a.id === authorId);
    if (!author) return res.status(400).json({ error: "Author not found" });

    // Check for duplicate book (same title and author)
    const duplicate = books.find(b => b.title === title && b.authorId === authorId);
    if (duplicate) return res.status(409).json({ error: "Duplicate book for this author" });

    const newBook: Book = {
        id: books.length + 1,
        title,
        year,
        authorId
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

//we get alll the books here
router.get('/', (_req: Request, res: Response) => {
    res.json(books);
});

//we get the book by ID here
router.get('/:id', (req: Request, res: Response) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: "Book not found" });

    res.json(book);
});

//and we update the book here
router.put('/:id', (req: Request, res: Response) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: "Book not found" });

    const { title, year, authorId } = req.body;

    if (authorId) {
        const author = authors.find(a => a.id === authorId);
        if (!author) return res.status(400).json({ error: "Author not found" });
        book.authorId = authorId;
    }

    if (title) book.title = title;
    if (year) book.year = year;

    res.json(book);
});

//this is where we delete the books by usig ID 
router.delete('/:id', (req: Request, res: Response) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Book not found" });

    books.splice(index, 1);
    res.status(204).send();
});

//this is where we get all the books by AuthorID
router.get('/author/:authorId', (req: Request, res: Response) => {
    const authorId = parseInt(req.params.authorId);
    const author = authors.find(a => a.id === authorId);
    if (!author) return res.status(404).json({ error: "Author not found" });

    const authorBooks = books.filter(b => b.authorId === authorId);
    res.json(authorBooks);
});

export default router;
