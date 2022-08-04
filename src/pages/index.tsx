import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useUserContext } from "../context/user.context";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";
import LoginForm from "./login";

const Home: NextPage = () => {
	const user = useUserContext();

	if (!user) {
		return <LoginForm />;
	}

	return (
		<div className="wrapper">
			<div>
				<Link href="/posts/new">
					<button>Create post</button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
