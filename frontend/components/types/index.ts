export type Category = {
    id: number;
    name: string;
    urlImage: string;
}


export type User = {
    id: number;
    email: string;
    username: string;
    roles: string[];
}