import Projects from '@/components/Projects';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Projects @ Kristian Dafov</title>
        <meta name="description" content="Personal website & portfolio of Kristian Dafov." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.kdafov.com/" />
        <meta property="og:title" content="Me @ KGD" />
        <meta property="og:description" content="Personal website of Kristian Dafov." />
        <meta property="og:url" content="https://www.kdafov.com/" />
        <meta property="og:type" content="website" />
        <meta name="language" content="en" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index" />
      </Head>

      <Projects />
    </>
  )
}