import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, SwitchHorizontalIcon, TrashIcon } from '@heroicons/react/outline';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { db } from '../firebase';
import Post from './Post'

function Comment({id, comment}) {
  const { data: session } = useSession();
    const [post, setPost] = useState();
    const [posts, setPosts] = useState([]);
    const router = useRouter()
 

    useEffect(
        () =>
          onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot.data())),
        [db]
      );
  return (

    // <div className="max-h-screen overflow-auto pb-72 scrollbar-hide">
    //       <Post key={comment.id} post={comment?.comment} />
    //   </div>

    <div className="p-3 flex cursor-pointer border-b justify-between">
      <img
        src={comment?.userImg}
        alt=""
        className="h-14 w-14 rounded-full mr-3"
      />
      <div className="flex flex-col space-y-2 w-full ">
        <div className="flex justify-between items-center ">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-neutral-800 text-[15px] inline-block">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-[15px] ">
                @{comment?.tag}
              </span>
            </div>
            <span className="hover:underline text-[15px] ml-1.5 ">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-neutral-800 mt-0.5 max-w-lg overflow-scroll text-[15px]">
              {comment?.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-theme" />
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12 mx-auto">
          <div className="icon group">
            <ChatIcon className="h-5 group-hover:text-theme" />
          </div>
          {session?.user.name === comment?.username ? (
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
          <div className="flex items-center space-x-1 group">
            <div className="icon">
              <HeartIcon className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="group-hover:text-pink-600 text-sm"></span>
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

  )
}

export default Comment