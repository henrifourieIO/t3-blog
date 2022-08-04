// import LoginForm from "../components/LoginForm";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../components/LoginForm"), {
  ssr: false,
});

function LoginPage() {
  return (
    <div className="wrapper col">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
