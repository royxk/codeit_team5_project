//Save Local Storage with array that contains object max 6
import { NoticeItem } from "@/components/common/Post/PostListType";

export function getRecentPostsLocalStorage(): NoticeItem[] {
  const recentPosts = localStorage.getItem("recentPosts");
  return recentPosts ? JSON.parse(recentPosts) : [];
}

export function saveRecentPostsLocalStorage(data: NoticeItem) {
  // Check if the data is already in the local storage do Nothing
  const recentPosts = getRecentPostsLocalStorage();
  const isExist = recentPosts.find((post) => post.item.id === data.item.id);
  const newRecentPosts = [data, ...recentPosts].slice(0, 6);
  localStorage.setItem("recentPosts", JSON.stringify(newRecentPosts));
}

//Remove Local Storage remove all data
export function removeRecentPostsLocalStorage() {
  const recentPosts = getRecentPostsLocalStorage();
  recentPosts.length = 0;
  localStorage.setItem("recentPosts", JSON.stringify(recentPosts));
}

export function clearRecentPostsLocalStorage() {
  localStorage.removeItem("recentPosts");
}
