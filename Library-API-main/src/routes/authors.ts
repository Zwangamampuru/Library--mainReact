import { Router, Request, Response, response } from 'express';
import { authors, Author } from '../models/author';

const router = Router();

//this is where I am creating the Author 'C' in CRUD
router.post('/', (req: Request, response: Response) => {
    const { name, biography, email } = req.body;
    if (!name) //if name is not entered will return the message
        return response.status(400).json({ error: "Name is Requred" });

    const newAuthor: Author = {
        id: authors.length + 1,
        name, biography, email
    };
    authors.push(newAuthor);
    response.status(201).json(newAuthor);
});

//read/get all authors 

router.get('/', (request, response) =>{
    response.json(authors);
});

// and this is where we get/read the author by his/her ID 'R' in CRUD
router.get('/:id', (request, response) => {
    const author = authors.find(a => a.id === parseInt(request.params.id));
    const { name, biography, email } = request.body;
    if (!author)
        return response.status(404).json({ error: 'Author is not found in ourz database' });
    else if (name)
        author.name = name;
    else if (biography)
        author.biography = biography;
    else if (email)
        author.email = email;
    response.json(author);
});

//and this is where we update the author by using ID ....this is 'U' in CRUD
router.put('/:id', (req: Request, res: Response) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author)
        return res.status(404).json({ error: 'Author not found' });

    const { name, biography, email } = req.body;
    if (name) author.name = name;
    if (biography) author.biography = biography;
    if (email) author.email = email;

    res.json(author);
});

//this is where we delete the author and it is 'D' in delete

router.delete('/:id', (req: Request, res: Response) => {
    const index = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1)
        return res.status(404).json({ error: "Author not found" });

    authors.splice(index, 1); // remove the author
    res.status(204).send(); // successful deletion, no content
});

export default router;