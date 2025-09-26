import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import * as React from "react";

type Props = {
    to: string;
    children: React.ReactNode;
    variant?: "text" | "outlined" | "contained";
    color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
};

export default function LinkButton({
    to,
    children,
    variant = "outlined",
    color = "primary",
}: Props) {
    return (
        <Button component={Link} to={to} variant={variant} color={color}>
            {children}
        </Button>
    );
}
