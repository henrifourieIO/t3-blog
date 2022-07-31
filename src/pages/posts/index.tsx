import Link from "next/link"
import { trpc } from "../../utils/trpc"

function PostListingPage() {

    const {data, isLoading} = trpc.useQuery(['posts.posts'])

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    return(
        <div>
            <h1>Posts</h1>
            <div>
            {data?.map((post) => {
                return(
                    <article key={post.id}>
                        <h4>{post.title}</h4>
                        <Link href={`/posts/${post.id}`}>View post</Link>
                    </article>
                )
            })}

            </div>
        </div>
    )
}

export default PostListingPage