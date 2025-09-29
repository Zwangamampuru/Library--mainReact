import { Request, Response, NextFunction } from 'express';

//this is Logger middleware  and it is used to track and monitor HTTP request coming into my SERVER
export const logger = (req: Request, _res: Response, next: NextFunction) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
};
