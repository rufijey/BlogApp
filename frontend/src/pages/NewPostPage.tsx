import { Box, Typography } from "@mui/material";
import CreatePostForm from "../components/posts/CreatePostForm.tsx";

export default function NewPostPage() {

    return (
        <Box>
            <Typography variant="h4" mb={3}>Create New Post</Typography>
            <CreatePostForm/>
        </Box>
    );
}
