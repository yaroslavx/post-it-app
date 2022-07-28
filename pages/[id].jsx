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
import { ArrowLeftIcon } from "@heroicons/react/outline";
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

      <main className="grid grid-cols-9">
        <Sidebar />
        <div className="col-span-8 md:col-span-7 lg:col-span-5 border-x h-screen">
          <div className="flex items-center px-1.5 py-2 border-b text-black font-bold text-xl gap-x-4  top-0 z-50 bg-white">
            <div
              className="icon w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="icon h-5 text-theme" />
            </div>
            Post
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div>
              {comments.map((comment) => (
                <Comment key={comment.id} id={comment.id } comment={comment.data()} />
              ))}
            </div>
          )}
        </div>
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;
