import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const router = useRouter()
  const { data: session } = useSession();

  return (
    <div className="flex-col hidden md:inline md:col-span-2 items-center px-3 md:items-start mt-4 space-y-2">
      <div onClick={() => router.push("/")} className="bg-theme rounded-xl mb-4 py-2 px-5 w-full hover:bg-theme/70 transition-all duration-200 cursor-pointer">
        <img
          src="https://see.fontimg.com/api/renderfont4/ALJ6m/eyJyIjoiZnMiLCJoIjoxNzQsInciOjIwMDAsImZzIjo4NywiZmdjIjoiI0ZFRkZGRiIsImJnYyI6IiM2NkJGRkYiLCJ0IjoxfQ/UE9TVFk/landasans-medium.png"
          className="h-10"
        />
      </div>
    <div onClick={() => router.push("/")} >
    <SidebarRow Icon={HomeIcon} title="Home" />
    </div>
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      <SidebarRow Icon={UserIcon} title="Sign In" />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
      
      <div
        className="flex items-center group rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 py-2"
        onClick={signOut}
      >
        <img
          src={session?.user.image}
          alt=""
          className="h-10 rounded-full mx-2 mr-2.5 object-contain "
        />
        <p className="text-neutral-800 text-lg font-medium group-hover:text-theme transition-all duration-200">Sign Out</p>
      </div>

    </div>
  );
}

export default Sidebar;
