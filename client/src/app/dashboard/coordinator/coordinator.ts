import { Timestamp } from "rxjs";

export interface Task {
    id: number;
    title: string;
    body: string;
    user_id: number;
    doneAt: Date | null;
    user: User;
}

export interface User{
    email:string;
    id:string;
    name: string;
}
