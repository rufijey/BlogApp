import { useState } from "react";
import { useGetPostsQuery } from "../../../services/postsApi.ts";
import Loader from "../../UI/Loader.tsx";
import PostCard from "../PostCard/PostCard.tsx";
import styles from "./PostList.module.css";
import SearchInput from "../../UI/SearchInput/SearchInput.tsx";
import { useDebounce } from "../../../hooks/useDebounce.ts";
import Pagination from "../../UI/Pagination/Pagination.tsx";

export default function PostList() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 5;

    const debouncedSearch = useDebounce(search, 500);

    const { data: postsData, isFetching } = useGetPostsQuery({
        search: debouncedSearch,
        page,
        limit,
    });

    const totalPages = postsData ? Math.ceil(postsData.total / limit) : 1;

    return (
        <div className={styles.container}>
            <SearchInput
                value={search}
                placeholder="Search posts..."
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            {isFetching ? (
                <Loader />
            ) : (
                <>
                    {postsData?.data?.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </div>
    );
}
