//md 파일을 데이터로 만들어주는 함수
import fs from "fs";
import path from "path";
import matter from "gray-matter";

//post 폴더 경로
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // /posts 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory);
  //fileNames = [ 'ssg-ssr.md', 'pre-rendering.md']

  const allPostsData = fileNames.map((fileName) => {
    // 파일 이름에서 .md 제거
    const id = fileName.replace(/\.md$/, "");
    // ssg-ssr

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter 로 변환
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  // 최신 날짜 순으로 정렬
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
