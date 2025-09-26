import { Button } from "@mui/material";
import { useDeletePostMutation } from "../../services/postsApi.ts";
import { useNavigate } from "react-router-dom";

type Props = { postId: string };

export function DeletePostButton({ postId }: Props) {
    const [deletePost] = useDeletePostMutation();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await deletePost(postId).unwrap();
        navigate("/");
    };

    return (
        <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete Post
        </Button>
    );
}
