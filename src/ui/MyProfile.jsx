import FullPostModal from "../components/post/FullPostModal";
import EditProfileModal from "../components/profile/EditProfileModal";
import Button from "./Button";

function MyProfile({
  avatar,
  username,
  fullName,
  bio,
  postsCount,
  likesCount,
  posts,
  followers,
  followed,
  handleEditProfile,
  isEditModalVisible,
  setEditModalVisible,
  isPostModalVisible,
  selectedPost,
  handleClosePostModal,
  handlePostClick,
}) {
  return (
    <div className="flex flex-col items-center p-8 md:w-full">
      <div className="flex flex-col items-center p-4 md:w-2/4">
        <div className="mb-4 h-32 w-32 overflow-hidden rounded-full md:h-40 md:w-40">
          <img
            src={avatar}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="text-xl font-semibold text-gray-800">{fullName}</h1>
        <p className="text-gray-500">@{username}</p>
        <p className="mt-2 text-center text-gray-600">{bio}</p>

        <div className="mt-6 flex w-full justify-around gap-4 text-gray-700">
          <div className="text-center">
            <span className="text-lg font-bold">{postsCount}</span>
            <p className="text-sm">Posts</p>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold">{likesCount}</span>
            <p className="text-sm">Likes</p>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold">{followed}</span>
            <p className="text-sm">Followers</p>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold">{followers}</span>
            <p className="text-sm">Following</p>
          </div>
        </div>

        <div className="mt-6">
          <Button color="gray" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </div>
      </div>

      <EditProfileModal
        isVisible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleEditProfile}
        initialData={{ fullName, username, avatar, bio }}
      />

      <div className="p-4 md:w-full">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">My Posts</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:shadow-gray-100"
                key={post.id}
                onClick={() => handlePostClick(post)}
              >
                <img
                  src={post.photo_url}
                  alt="Post"
                  className="mb-4 h-40 w-full rounded-lg object-cover shadow-md"
                />
                <p className="text-sm text-gray-700">{post.description}</p>
              </div>
            ))
          ) : (
            <h1 className="text-xl text-gray-800">No posts yet</h1>
          )}
        </div>
      </div>
      <FullPostModal
        isVisible={isPostModalVisible}
        onClose={handleClosePostModal}
        post={selectedPost}
      />
    </div>
  );
}

export default MyProfile;