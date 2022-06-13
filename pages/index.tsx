import { FC, Fragment } from 'react'
import NavBar from '@components/NavBar'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Home: FC = () => {
  const router = useRouter()
  const routerFindword = () => {
    router.push('/findword')
  }
  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <NavBar />
      <p>Hello, World</p>
      <div>
        <p>Deplayment command</p>
      </div>
      {/* useRouter to /findword */}
      <button
        onClick={routerFindword}
        className="m-4 rounded-md bg-orange-100 px-2 py-2 transition duration-150 ease-in-out hover:bg-orange-200 hover:scale-110"
      >
        Find Word
      </button>
    </Fragment>
  )
}

export default Home
