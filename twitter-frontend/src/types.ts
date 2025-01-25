export interface Tweet {
    id?: number;
    handle: string;
    text: string;
    createdOn: string;
    profile?: Profile;
}

export interface Profile {
    id: number;
    verified: boolean;
    handle: string;
    name: string;
    bio: string;
}