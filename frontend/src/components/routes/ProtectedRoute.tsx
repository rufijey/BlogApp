import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

type Props = {
    children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
    const token = useSelector((state: RootState) => state.user.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
