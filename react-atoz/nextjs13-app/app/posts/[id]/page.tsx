import React from "react";

async function getPost(postId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/posts/records/${postId}`,
    {
      //10초마다 새로 불러오기
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

const PostDetailPage = async ({ params }: any) => {
  const post = await getPost(params.id);
  return (
    <div>
      <h1>{post.id}</h1>
      <div>
        <div>{post.title}</div>
        {post.created}
      </div>
    </div>
  );
};

export default PostDetailPage;
