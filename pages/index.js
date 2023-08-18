import Home from '@/components/Home';
import axios from 'axios';
import Head from 'next/head';

// Logic for adding quote
const sendQuote = (dataObject) => {
  axios.put(process.env.URL_ORIGIN + '/api/add-request', {
    name: dataObject[0].name,
    email: dataObject[0].email,
    message: dataObject[0].message,
  });
}

// Logic for adding reviews data
const addReview = (dataObject) => {
  axios.post(process.env.URL_ORIGIN + '/api/add-review', {
    name: dataObject[0].name,
    relation: dataObject[0].relation,
    content: dataObject[0].content,
  });
}

export const getServerSideProps = async () => {
  // Logic for fetching reviews data
  const reviewsReq = await fetch(process.env.URL_ORIGIN + '/api/load-reviews');
  const reviewsData = await reviewsReq.json();

  // Return props
  return { props : { reviewsData } }
}
 
export default function Page({ reviewsData }) {
  return (
    <>
    <Head>
        <title>Me @ Kristian Dafov</title>
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

      <Home reviews={reviewsData} uploadReview={addReview} sendQuote={sendQuote} />
    </>
  )
}