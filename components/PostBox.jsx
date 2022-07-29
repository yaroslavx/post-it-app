import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SetStateAction, useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";

function PostBox() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div
      className={`p-3 flex space-x-3 border-b overflow-y-scroll scrollbar-hide ${
        loading && "opacity-60"
      }`}
    >
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        src={session.user.image}
        alt=""
      />
      <div className={`flex flex-1 items-center pl-2`}>
        <form className={`flex flex-1 flex-col`}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's happening?"
            className="h-24 w-full text-neutral-800 outline-none text-xl placeholder:text-xl"
          />

          {selectedFile && (
            <div className={`${selectedFile && "pb-5"} relative`}>
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}

          {!loading && (
            <div className="flex items-center">
              <div className="flex flex-1 space-x-1 pl-1 text-theme">
                <div
                  className="icon"
                  onClick={() => filePickerRef.current.click()}
                >
                  <PhotographIcon />
                  <input
                    type="file"
                    hidden
                    onChange={addImageToPost}
                    ref={filePickerRef}
                  />
                </div>
                <ChartBarIcon className="icon rotate-90" />
                <CalendarIcon className="icon" />
                <SearchCircleIcon className="icon" />
                <LocationMarkerIcon className="icon" />
              </div>
              <button
                onClick={sendPost}
                disabled={!input.trim() && !selectedFile}
                className="bg-theme px-5 py-2 font-bold text-white rounded-full hover:bg-theme/70 transition-all duration-200 disabled:opacity-70"
              >
                Post
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostBox;
