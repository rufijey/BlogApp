import { useSelector } from "react-redux";
import { type RootState } from "../../../store/store";
import LogoutButton from "./LogoutButton";
import LinkButton from "../../UI/LinkButton";
import styles from "./AuthButtons.module.css";

export default function AuthButtons() {
    const accessToken = useSelector((state: RootState) => state.user.token);

    if (accessToken) {
        return (
            <div className={styles.authContainer}>
                <LogoutButton />
            </div>
        );
    }

    return (
        <div className={styles.authContainer}>
            <LinkButton to="/login">Login</LinkButton>
            <LinkButton to="/register">Register</LinkButton>
        </div>
    );
}
