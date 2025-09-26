import type { ChangeEvent } from "react";
import styles from "./SearchInput.module.css";

type Props = {
    value: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ value, placeholder = "", onChange }: Props) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles.input}
        />
    );
}
