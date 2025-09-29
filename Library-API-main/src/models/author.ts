export  interface Author{
    id: number; //it have to be Unique
    name: string; //full names of the author
    biography: string;
    email: string; //for contact purposess
}

export const authors: Author[] = [];