import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
            <CircularProgress />
        </Box>
    );
}
