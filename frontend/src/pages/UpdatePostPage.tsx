import { CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../services/postsApi";
import UpdatePostForm from "../components/posts/UpdatePostForm";

export default function UpdatePostPage() {
    const { id } = useParams<{ id: string }>();

    const { data: post, isLoading } = useGetPostQuery(id!);

    if (isLoading) return <CircularProgress />;
    if (!post) return <Typography>Post not found</Typography>;

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
                Edit Post
            </Typography>

            <UpdatePostForm
                postId={post.id}
                initialValues={{ title: post.title, content: post.content }}
            />
        </div>
    );
}
