import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  query,
  collection,
  orderBy,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import Router, { useRouter } from "next/router";
import Moment from "react-moment";

function Modal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setIsOpen(false);
    setComment("");

    router.push(`/${postId}`);
  };

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#858585] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className=" border-b flex items-center px-1.5 py-2">
                <div
                  className="w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-0 left-0 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="text-white h-5" />
                </div>
              </div>
              <div className="flex px-4 pt-2.5 pb-2.5 ">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative items-center">
                    <span className="w-0.5 h-full z-[-1] absolute left-[21px] top-11 bg-gray-400" />
                    <img
                      src={post?.userImg || session.user.image}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div className="text-[#6e767d]">
                      <div className="inline-block group">
                        <h4
                          className={`font-bold text-[15px] text-neutral-800 group-hover:underline inline-block`}
                        >
                          {post?.username || session.user.name}
                        </h4>
                        <span className={`text-[15px] ml-1.5`}>
                          @{post?.tag || session.user.tag}
                        </span>
                      </div>
                      <span className="text-[15px] ml-1.5">
                        {post ? (
                          <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        ) : null}
                      </span>
                      {post ? (
                        <p className="text-[15px] mt-0.5 text-neutral-800">
                          {post?.text}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-7 flex space-x-3 w-full">
                    <img
                      src={session.user.image}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div className="flex-grow mt-2">
                      <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        placeholder="Post your reply"
                        aria-expanded
                        className="h-8 w-full outline-none "
                      />
                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex flex-1 space-x-1 text-theme ">
                          <PhotographIcon className="icon" />

                          <ChartBarIcon className="icon rotate-90" />

                          <EmojiHappyIcon className="icon " />

                          <CalendarIcon className="icon" />
                        </div>
                        <button
                          className="bg-theme px-5 py-2 font-bold text-white rounded-full transition-all duration-200 disabled:opacity-70 hover:bg-theme/70"
                          type="submit"
                          onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
