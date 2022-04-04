import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) {
  return <div>{title}</div>;
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  //  console.log(paths)

  return {
    //  paths: [{params: { slug: 'meu rascunho' }}]
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markeddownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markeddownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
