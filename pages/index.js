import fs from 'fs'
import path from 'path'
import Head from 'next/head'

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div>
      <Head>
        <title>Blog do Nadilson</title>
      </Head>

      <h2>Olá!</h2>
    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))

  console.log(files)

  return {
    props: {
      posts: 'Postagens',
    },
  }
}