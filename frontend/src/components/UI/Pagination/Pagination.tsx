import styles from "./Pagination.module.css";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={styles.pagination}>
            {pages.map((p) => (
                <button
                    key={p}
                    className={p === page ? styles.activePage : ""}
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </button>
            ))}
        </div>
    );
}
