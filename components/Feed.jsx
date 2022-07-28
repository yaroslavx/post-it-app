import { RefreshIcon } from "@heroicons/react/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import PostBox from "./PostBox";
import Post from "./Post";

function Feed() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="col-span-8 md:col-span-7 lg:col-span-5 border-x h-screen">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-extrabold">Home</h1>
        <RefreshIcon className="h-8 w-8 cursor-pointer text-theme mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>

      <PostBox />
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()}/>
        ))}
      </div>
    </div>
  );
}

export default Feed;
