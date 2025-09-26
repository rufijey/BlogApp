export interface Post {
    id: string;
    title: string;
    content: string;
    comments: Comment[];
}

export interface Comment {
    id: string;
    postId: string;
    author: string;
    content: string;
}

export type NewPost = Omit<Post, "id" | "comments">;
export type NewComment = Omit<Comment, "id">;

export interface PaginatedPosts {
    data: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
