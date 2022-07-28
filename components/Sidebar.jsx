import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon,
    DotsHorizontalIcon
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import SidebarRow from './SidebarRow'

function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className='flex flex-col col-span-1 md:col-span-2 items-center px-4 md:items-start'>
        <img
          src="https://see.fontimg.com/api/renderfont4/owPmq/eyJyIjoiZnMiLCJoIjoxNzQsInciOjIwMDAsImZzIjo4NywiZmdjIjoiIzQ2QTdGRiIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/UG9zdCBJdA/lowball-semibold-text.png"

          className="hidden md:inline h-10 m-3 p-1"
        />
        <img
          src="https://see.fontimg.com/api/renderfont4/owPmq/eyJyIjoiZnMiLCJoIjoxNzQsInciOjIwMDAsImZzIjo4NywiZmdjIjoiIzQ2QTdGRiIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/UA/lowball-semibold-text.png"
          className="md:hidden h-8 m-4 "
        />

        <SidebarRow Icon={HomeIcon} title="Home"/>
        <SidebarRow Icon={HashtagIcon} title="Explore"/>
        <SidebarRow Icon={BellIcon} title="Notifications"/>
        <SidebarRow Icon={MailIcon} title="Messages"/>
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks"/>
        <SidebarRow Icon={CollectionIcon} title="Lists"/>
        <SidebarRow Icon={UserIcon} title="Sign In"/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} title="More"/>

        <div
        className="text-black cursor-pointer flex items-center hoverAnimation lg:ml-auto lg:-mr-5 mt-7 mx-auto"
        onClick={signOut}
      >
        <img
          src={session?.user.image}
          alt=""
          className="h-10 rounded-full lg:mr-2.5 object-contain"
        />
        <div className="hidden lg:inline leading-5">
          <h4 className="font-bold">{session?.user.name}</h4>
          <p className="text-[#6e767d]">@{session?.user.tag}</p>
        </div>
        
        <div className="h-5 hidden lg:inline ml-10" />
      </div>
    </div>
  )
}

export default Sidebar
