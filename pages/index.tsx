import { FC , Fragment} from 'react'
import NavBar from '@components/NavBar'
import Head from 'next/head'

const Home:FC = () => { 
return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
        <NavBar />
      <p>Hello, World</p>
    </Fragment>
  )
}

export default Home
