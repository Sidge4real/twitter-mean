import { ObjectId } from "mongodb";

export interface Tweet {
    _id?: ObjectId;
    id: number;
    handle: string;
    text: string;
    createdOn: string;
}

export interface Profile {
    _id?: ObjectId;
    id: number;
    verified: boolean;
    handle: string;
    name: string;
    bio: string;
}