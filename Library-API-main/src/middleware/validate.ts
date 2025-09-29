import { Request, Response, NextFunction } from 'express';
import { authors } from '../models/author';
import { books, Book } from '../routes/books';

// Validate Author payload
export const validateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name, biography, email } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: "Author name is required and must be a string" });
    }
    if (!biography || typeof biography !== 'string') {
        return res.status(400).json({ error: "Biography is required and must be a string" });
    }
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Email is required and must be a string" });
    }
    next();
};
// Validate Book payload
export const validateBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, year, authorId } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: "Book title is required and must be a string" });
    }
    if (!year || typeof year !== 'number') {
        return res.status(400).json({ error: "Year is required and must be a number" });
    }
    if (!authorId || typeof authorId !== 'number') {
        return res.status(400).json({ error: "authorId is required and must be a number" });
    }
    // Check if author exists
    const authorExists = authors.find(a => a.id === authorId);
    if (!authorExists) {
        return res.status(400).json({ error: "Author not found" });
    }
    next();
};
