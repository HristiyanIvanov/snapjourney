import { GoFileMedia, GoLocation } from "react-icons/go";
import Button from "./Button";

function AddPost({ openImageModal, openLocationModal, createPost }) {
  return (
    <form className="flex size-4/5 flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600">
      <h1 className="text-2xl font-light">Share your memories</h1>
      <textarea
        className="rounded-lg border border-gray-200 p-2 outline-teal-400"
        type="number"
        id="description"
        placeholder="What do you want to share?"
      />
      <div className="flex flex-row items-center justify-between gap-2">
        <div>
          <div className="flex flex-row gap-2">
            <button
              className="flex flex-row items-center gap-2 rounded-xl border border-orange-400 p-2 transition-all duration-300 hover:bg-orange-200"
              onClick={openImageModal}
            >
              <GoFileMedia />
              <h1>Image</h1>
            </button>
            <button
              className="flex flex-row items-center gap-2 rounded-xl border border-gray-400 p-2 transition-all duration-300 hover:bg-gray-200"
              onClick={openLocationModal}
            >
              <GoLocation />
              <h1>Location</h1>
            </button>
          </div>
        </div>
        <div className="">
          <Button onClick={createPost}>Add Post</Button>
        </div>
      </div>
    </form>
  );
}

export default AddPost;
