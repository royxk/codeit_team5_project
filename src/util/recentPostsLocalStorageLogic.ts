//Save Local Storage with array that contains object max 6

import PostType from "@/components/common/Post/PostListType";

export function getRecentPostsLocalStorage(): PostType[] {
  const recentPosts = localStorage.getItem("recentPosts");
  return recentPosts ? JSON.parse(recentPosts) : [];
}

export function saveRecentPostsLocalStorage(data: PostType) {
  // Check if the data is already in the local storage do Nothing
  const recentPosts = getRecentPostsLocalStorage();
  if (recentPosts.some((post) => post.item.id === data.item.id)) return;
  const newRecentPosts = [data, ...recentPosts].slice(0, 6);
  localStorage.setItem("recentPosts", JSON.stringify(newRecentPosts));
}

//Remove Local Storage last item
export function removeRecentPostsLocalStorage() {
  const recentPosts = getRecentPostsLocalStorage();
  recentPosts.pop();
  localStorage.setItem("recentPosts", JSON.stringify(recentPosts));
}

export function clearRecentPostsLocalStorage() {
  localStorage.removeItem("recentPosts");
}
