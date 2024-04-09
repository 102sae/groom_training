import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { getAllPostIds, getPostData } from "@/lib/post";
import Head from "next/head";
import postStyles from "@/styles/Post.module.css";
const Post = ({
  postData,
}: {
  postData:
    | {
        title: string;
        date: string;
        contentHtml: string;
      }
    | undefined;
}) => {
  if (!postData) {
    return <div>Loading...</div>; // 데이터가 없을 때 처리
  }

  return (
    <div className={postStyles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  //params = [{id: 'ssg-ssr'}, {id: 'pre-rendering'}]
  return {
    paths,
    fallback: false,
    //fallback: false 는 paths에 없는 경우 404 페이지를 보여줌
  };
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: { postData },
  };
};
