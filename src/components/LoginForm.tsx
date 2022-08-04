import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserSchema } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    "users.verify-otp",
    {
      hash,
    },
  ]);

  if (isLoading) {
    return <p>Verifying...</p>;
  }

  router.push(data?.redirect.includes("login") 
    ? "/" 
    : data?.redirect 
    || "/"
  );

  return <p>Redirecting...</p>;
}

function LoginForm() {
  const { handleSubmit, register } = useForm<CreateUserSchema>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const onSubmit = (values: CreateUserSchema) => {
    mutate({...values, redirect: router.asPath});
  };

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      <form className="newForm" onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}

        {success && <p>Check your email</p>}
        <h1>Login</h1>

        <input
          type="email"
          placeholder="john.doe@gmail.com"
          {...register("email")}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <Link href="/register">Register</Link>
    </>
  );
}

export default LoginForm;
