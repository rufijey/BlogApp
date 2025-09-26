import { useNavigate } from "react-router-dom";
import type { Post } from "../../../types/posts.ts";
import styles from "./PostCard.module.css";

type Props = { post: Post };

export default function PostCard({ post }: Props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${post.id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick} role="button" tabIndex={0}>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.content}>{post.content}</div>
        </div>
    );
}
