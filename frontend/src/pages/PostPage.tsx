import { useParams } from "react-router-dom";
import PostDetails from "../components/posts/PostDetails/PostDetails.tsx";

export default function PostPage() {
    const { id } = useParams<{ id: string }>();

    if (!id) return <p>Invalid post id</p>;

    return <PostDetails postId={id} />;
}
