import { getProviders, getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import Login from "../components/Login";
import Modal from "../components/Modal";
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Toaster } from 'react-hot-toast'

const Home= ( {providers} ) => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  const { data: session } = useSession()
  if (!session) return <Login providers={providers} />;
  return (
    <div className="max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Post it</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>
      <main className='grid grid-cols-9'>
        <Sidebar/>
        <Feed/>
        {isOpen && (<Modal/>)}
        
        
        <Widgets/>
      </main>
    </div>
  )
}

export default Home


export  const getServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}