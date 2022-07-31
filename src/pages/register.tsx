import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserSchema } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function RegisterPage() {
    const { handleSubmit, register } = useForm<CreateUserSchema>();
    const router = useRouter()
    const { mutate, error } = trpc.useMutation(["users.register-user"], {
        onSuccess: () => {
            router.push("/login");
        }
    });

  const onSubmit = (values: CreateUserSchema) => {
    mutate(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>

        <input
          type="email"
          placeholder="john.doe@gmail.com"
          {...register("email")}
        />
        <br />
        <input type="name" placeholder="John Doe" {...register("name")} />
        <br />
        <button type="submit">Register</button>
      </form>

      <Link href="/login">Login</Link>
    </>
  );
}

export default RegisterPage;
