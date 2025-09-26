import type { ReactNode } from "react";
import { Box, Button } from "@mui/material";
import styles from "./BaseForm.module.css";

type Props = {
    children: ReactNode;
    onSubmit: () => void | Promise<void>;
    submitText?: string;
};

export default function BaseForm({ children, onSubmit, submitText = "Submit" }: Props) {
    return (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className={styles.container}>
            {children}
            <Button type="submit" variant="contained" className={styles.submitBtn}>
                {submitText}
            </Button>
        </Box>
    );
}
