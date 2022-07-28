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

const Home = ({trendingResults, followResults, providers}) => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  const { data: session } = useSession()
  if (!session) return <Login providers={providers} />;
  return (
    <div className="max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Post it</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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


export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}