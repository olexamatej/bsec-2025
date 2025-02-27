import { getPosts } from "./lib/get-posts";
import { Post } from "./ui/post";

export default async function Page() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
