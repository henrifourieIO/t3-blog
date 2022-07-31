import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { CreatePostSchema } from "../../schema/post.schema"
import { trpc } from "../../utils/trpc"

function CreatePostPage() {
    const {handleSubmit, register} = useForm<CreatePostSchema>()
    const router = useRouter()

    const {mutate, error} = trpc.useMutation(['posts.create-post'], {
        onSuccess({id}) {
            router.push(`/posts/${id}`)
        }
    })

    function onSubmit(values:CreatePostSchema) {
        mutate(values)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && error.message}

            <h1>Create Post</h1>
            <br />
            <input 
                type="text"
                placeholder="Your post title"
                {...register('title')}
            />
            <br />
            <textarea
                placeholder="Your post body"
                {...register('body')}
            />
            <br />
            <button type="submit" >Submit</button>
        </form>
    )
}

export default CreatePostPage