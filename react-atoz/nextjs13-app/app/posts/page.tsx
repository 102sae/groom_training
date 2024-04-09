import Link from "next/link";
import React from "react";
import CreatePost from "./CreatePost";

async function getPost() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/posts/records",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data?.items as any[];
}

const PostPage = async () => {
  const posts = await getPost();
  console.log(posts);
  return (
    <div>
      {posts?.map((post) => (
        <PostItme key={post.id} post={post} />
      ))}
      <CreatePost />
    </div>
  );
};

export default PostPage;

const PostItme = ({ post }: any) => {
  const { title, id, created } = post || {};
  return (
    <Link href={`posts/${id}`}>
      <h2>{title}</h2>
      <p>{created}</p>
    </Link>
  );
};
