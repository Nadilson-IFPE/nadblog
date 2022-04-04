import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog do Nadilson</title>
      </Head>

      <div className='posts'>
        {posts.map((post, index) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts
  const posts = files.map((fileName) => {
    // Create slug
    const slug = fileName.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('posts', fileName), 'utf-8')

    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  return {
    props: {
      posts,
    },
  }
}