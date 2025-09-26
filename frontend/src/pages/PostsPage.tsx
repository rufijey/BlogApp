import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PostList from "../components/posts/PostList/PostList.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function PostsPage() {
    const token = useSelector((state: RootState) => state.user.token);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">All Posts</Typography>
                {token && (
                    <Button component={Link} to="/new" variant="contained">
                        New Post
                    </Button>
                )}
            </Box>
            <PostList />
        </Box>
    );
}
