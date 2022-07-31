// import LoginForm from "../components/LoginForm";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../components/LoginForm"), {
  ssr: false,
});

function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}

export default LoginForm;
