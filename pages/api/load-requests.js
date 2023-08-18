import clientPromise from '@/lib/mongoConfig';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Establish connection to database
    const client = await clientPromise;
    const db = client.db('kdafov');
  
    // Fetch data
    const reviews = await db
      .collection("requests")
      .find({})
      .sort({ metacritic: -1 })
      .limit(100)
      .toArray();

    // Return status
    let resultsArr = [];
    if (reviews.length > 0) {
      reviews.map((v) => {
        resultsArr.push([
          decodeURIComponent(v.name), 
          decodeURIComponent(v.email),
          decodeURIComponent(v.message)
        ]);
      });
    }

    res.status(200).json(resultsArr);

  } else {
    res.status(405).send('[405 INVALID METHOD] Invalid method of request. Method: ' + req.method + ' not permitted!');
  }
}