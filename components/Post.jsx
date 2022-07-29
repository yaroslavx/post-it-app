import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import { db } from "../firebase";

const Post = ({ id, post, postPage, comm }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
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

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };
  console.log(comments)

  return (
    <div
      className="p-3 flex cursor-pointer border-b hover:bg-gray-100 transition-all duration-200"
      onClick={() => router.push(`/${id}`)}
      >
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="h-14 w-14 rounded-full object-cover mr-2.5"
        />
      )}
      <div className={`flex flex-col space-y-2 w-full justify-center ${comm && "space-y-0"}`}>
        <div className={`flex items-center ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="profilepic"
              className="h-14 w-14 rounded-full object-cover mr-2.5"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] text-neutral-800 group-hover:underline ${
                  !postPage && "inline-block"
                } ${comm && "mt-1.5"}`}
              >
                {post?.username}
              </h4>
              <span className={`text-[15px] ${!postPage && "ml-1.5"}`}>
                @{post?.tag}
              </span>
            </div>
            <span className="text-[15px] ml-1.5">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {!postPage && !comm && (
              <p className="text-[15px] mt-0.5 text-neutral-800">
                {post?.text}
              </p>
            )}
          </div>
          <div className="mt-1.5 icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-theme" />
          </div>
        </div>
        {postPage && (
          <p className="text-[15px] mt-0.5 text-neutral-800 mx-1">{post?.text}</p>
        )}
        {comm && (
          <p className="text-[15px] text-neutral-800">{post?.comment}</p>
        )}

        <img
          src={post?.image}
          alt=""
          className={`${postPage && "mx-1"} rounded-2xl max-h-[700px] object-cover`}
        />
        <div
          className={`${comm && "pt-5"} text-[#6e767d] flex justify-between mx-auto w-10/12 pt-1`}
          >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
            >
            <div>
              <ChatIcon className="icon h-5 group-hover:text-theme" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-theme text-sm">
                {comments.length}
              </span>
            )}
          </div>

          {session?.user.uid === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-theme" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-theme" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
