import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Error from "next/error";
import Link from "next/link";

function SinglePostPage() {
	const router = useRouter();
	const postId = router.query.postId as string;

	const { data, error, isLoading } = trpc.useQuery([
		"posts.single-post",
		{ postId },
	]);

	if (isLoading) {
		return (
			<div className="wrapper">
				<h1>Loading...</h1>;
			</div>
		);
	}

	if (!data) {
		return <Error statusCode={404} />;
	}

	return (
		<div className="wrapper col">
			<div className="btn">
				<Link href="/posts">
					<button>{"<="} Back</button>
				</Link>
			</div>
			<div className="post main">
				<h1>{data?.title}</h1>
				<p>{data?.body}</p>
			</div>
		</div>
	);
}

export default SinglePostPage;
