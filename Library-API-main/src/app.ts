import express from 'express';
import bodyParser from 'body-parser';
import authorRoutes from './routes/authors';
import bookRoutes from './routes/books';
import { logger } from './middleware/logger';
import { errorHandler } from './errors/error';

const app = express();


app.use(bodyParser.json());
app.use(logger);
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.get('/', (_req, res) => {
    res.send('Library API is running');
});
app.use(errorHandler);

export default app;
