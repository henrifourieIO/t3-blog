import Link from "next/link";
import { trpc } from "../../utils/trpc";

function PostListingPage() {
	const { data, isLoading } = trpc.useQuery(["posts.posts"]);

	if (isLoading) {
		return (
			<div className="wrapper">
				<h1>Loading...</h1>;
			</div>
		);
	}

	return (
		<div className="wrapper">
			<div>
				<h1>Posts</h1>
				<div className="postWrapper">
					{data?.map((post) => {
						return (
							<article className="post" key={post.id}>
								<h4>{post.title}</h4>
								<Link href={`/posts/${post.id}`}>
									<span>View post</span>
								</Link>
							</article>
						);
					})}
				</div>
				<div>
					<Link href="/posts/new">
						<button>Create post</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default PostListingPage;
