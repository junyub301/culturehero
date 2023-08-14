export interface Board {
    id: string;
    title: string;
    userId: string;
    createdAt: string;
    content: string;
    updatedAt?: string;
}

export interface Comment {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt?: string;
    comment: string;
}
