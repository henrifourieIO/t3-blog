import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useUserContext } from '../context/user.context'
import styles from '../styles/Home.module.css'
import { trpc } from '../utils/trpc'
import LoginForm from './login'

const Home: NextPage = () => {
  const user = useUserContext()

  if(!user) {
    return <LoginForm />
  }

  return (
    <div>
      <Link href='/posts/new'>
        Create post
      </Link>
    </div>
  )
}

export default Home
