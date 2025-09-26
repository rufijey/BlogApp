import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PostList from "../components/posts/PostList/PostList.tsx";


export default function PostsPage() {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">All Posts</Typography>
                <Button component={Link} to="/new" variant="contained">New Post</Button>
            </Box>
            <PostList />
        </Box>
    );
}
