import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
}
