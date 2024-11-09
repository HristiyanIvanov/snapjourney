import { GoFileMedia, GoLocation } from "react-icons/go";
import Button from "./Button";

function AddPost({
  openImageModal,
  openLocationModal,
  description,
  setDescription,
  createPost,
}) {
  return (
    <form className="flex size-4/5 flex-col gap-5 rounded-xl border border-gray-300 bg-gray-50 px-5 py-6 font-light text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:shadow-gray-900/50">
      <h1 className="text-2xl font-light">Share your memories</h1>
      <textarea
        className="rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:shadow-gray-900/50"
        type="number"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What do you want to share?"
      />
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          <button
            className="flex flex-row items-center gap-2 rounded-xl border border-orange-400 p-2 transition-all duration-300 hover:bg-orange-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            onClick={openImageModal}
          >
            <div className="hidden sm:block">
              <GoFileMedia />
            </div>
            <h1>Image</h1>
          </button>
          <button
            className="flex flex-row items-center gap-2 rounded-xl border border-gray-400 p-2 transition-all duration-300 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            onClick={openLocationModal}
          >
            <div className="hidden sm:block">
              <GoLocation />
            </div>
            <h1>Location</h1>
          </button>
        </div>
        <Button onClick={createPost}>Add Post</Button>
      </div>
    </form>
  );
}

export default AddPost;
