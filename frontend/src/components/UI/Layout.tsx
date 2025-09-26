import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./Navbar/Navbar.tsx";
import Footer from "./Footer/Footer.tsx";

export default function Layout() {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <Container sx={{ flexGrow: 1, padding: "24px 0" }}>
                <Outlet />
            </Container>
            <Footer />
        </div>
    );
}
