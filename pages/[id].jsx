import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import Post from "../components/Post";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { ArrowLeftIcon, ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import { comment } from "postcss";
import Comment from "../components/Comment";

function PostPage({ providers }) {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot.data())),
    [db]
  );


  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );
  // if (!session) return <Login providers={providers} />;

  return (
    <div className="max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>
          {post?.username} on PostIt: {post?.text}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-9 min-h-screen">
        <Sidebar />
        <div className="col-span-9 md:col-span-7 lg:col-span-5 border-x">
          <div className="py-3 border-b">
            <div
              onClick={() => router.push("/")}
              className="flex items-center my-2.5 mx-2 text-neutral-800 rounded-full max-w-fit text-xl gap-x-0 top-0 z-50  pr-5 pl-3 group hover:bg-gray-100 group cursor-pointer transition-all duration-200"
            >
              <div className=" w-9 h-11 flex items-center justify-center">
                <ArrowNarrowLeftIcon className="group-hover:text-theme h-7 text-neutral-800 transition-all duration-200" />
              </div>
              <h1 className="group-hover:text-theme text-neutral-800 py-2 px-0 text-xl font-medium transition-all duration-200">
                Post
              </h1>
            </div>
          </div>
          <div className="max-h-screen overflow-scroll pb-72 scrollbar-hide">
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div>
              {comments.map((comment) => (
                <Post key={comment.id} id={comment.id} post={comment.data()} comm/>
                // <Comment
                //   key={comment.id}
                //   id={comment.id}
                //   comment={comment.data()}
                // />
              ))}
            </div>
          )}
          </div>
          
        </div>
        {isOpen && <Modal comments={comments}/>}
      </main>
    </div>
  );
}

export default PostPage;
