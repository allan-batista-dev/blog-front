export type Post = {
    id: number;
    created_at: Date;
    updated_at: Date;
    file: string;
    title: string;
    content: string;
    userId: number;
    subtitle: string
}