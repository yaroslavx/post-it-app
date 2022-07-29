import { RefreshIcon } from "@heroicons/react/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import PostBox from "./PostBox";
import Post from "./Post";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function Feed() {
  const [posts, setPosts] = useState([]);
  const router = useRouter()

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  const handleRefresh = () => {
    const refreshToast = toast.loading("Refreshing...");

    toast.success("Feed Updated!", { id: refreshToast });
  };

  return (
    <div className="col-span-9 md:col-span-7 lg:col-span-5 md:border-x ">
      <div className="flex items-center justify-between mt-2.5 pb-2.5 border-b">
        <div className="flex items-center ml-3 ">
          <div className="bg-theme hover:bg-theme/70 rounded-xl ml-1 py-2 pl-4 pr-2 w-fit md:hidden transition-all duration-200">
            <img
              src="https://see.fontimg.com/api/renderfont4/ALJ6m/eyJyIjoiZnMiLCJoIjoxNzQsInciOjIwMDAsImZzIjo4NywiZmdjIjoiI0ZFRkZGRiIsImJnYyI6IiM2NkJGRkYiLCJ0IjoxfQ/UA/landasans-medium.png"
              className="h-10"
            />
          </div>
          <h1 className="m-3 p-2 md:mx-0 md:my-3 text-xl font-medium hover:bg-gray-100 hover:text-theme transition-colors duration-200 rounded-full px-4 text-neutral-800 cursor-pointer" onClick={() => router.push("/")}>Home</h1>
        </div>
        <RefreshIcon
          onClick={handleRefresh}
          className="h-8 w-8 cursor-pointer text-theme mr-3 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <PostBox />
      <div className="max-h-screen overflow-auto pb-72 scrollbar-hide">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
