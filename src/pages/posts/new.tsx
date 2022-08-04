import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostSchema } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

function CreatePostPage() {
	const { handleSubmit, register } = useForm<CreatePostSchema>();
	const router = useRouter();

	const { mutate, error } = trpc.useMutation(["posts.create-post"], {
		onSuccess({ id }) {
			router.push(`/posts/${id}`);
		},
	});

	function onSubmit(values: CreatePostSchema) {
		mutate(values);
	}

	return (
		<div className="wrapper">
			<form className="newForm" onSubmit={handleSubmit(onSubmit)}>
				{error && error.message}
				<h1>Create Post</h1>
				<input
					type="text"
					placeholder="Your post title"
					{...register("title")}
				/>
				<textarea placeholder="Your post body" {...register("body")} />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default CreatePostPage;
