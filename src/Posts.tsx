import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { fetchPosts } from './postApi';

function Posts() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["posts", currentPage],
        queryFn: () => fetchPosts(currentPage)
    })

    const queryClient = useQueryClient();

    useEffect(() => {
        if (currentPage < 10) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery({
                queryKey: ["posts", nextPage],
                queryFn: () => fetchPosts(nextPage)
            })
        }
    }, [currentPage, queryClient])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <><div>Error fetching users</div>
            <p>{error?.toString()}</p>
        </>
    }

    const handleNextPage = () => {
        if (currentPage <= 10) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }
    return (
        <>
            <div>{data?.map((item: { title: string, body: string }, index: number) => {
                return (
                    <div key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </div>
                )
            })}</div>

            <button disabled={currentPage >= 10} onClick={handleNextPage}>Next Page</button>
            <button disabled={currentPage <= 1} onClick={handlePrevPage}>Prev Page</button>
        </>
    )
}

export default Posts