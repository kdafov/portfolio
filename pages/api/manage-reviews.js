import clientPromise from '@/lib/mongoConfig';
import { ObjectId } from "mongodb";

const deleteReview = () => {

}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Establish connection to database
    const client = await clientPromise;
    const db = client.db('kdafov');
  
    // Fetch data
    const reviews = await db
      .collection("reviews_on_hold")
      .find({})
      .sort({ metacritic: -1 })
      .limit(100)
      .toArray();

    // Return status
    let resultsArr = [];
    if (reviews.length > 0) {
      reviews.map((v) => {
        resultsArr.push([
          v._id,
          decodeURIComponent(v.name), 
          decodeURIComponent(v.relation),
          decodeURIComponent(v.content)
        ]);
      });
    }

    res.status(200).json(resultsArr);

  } else if (req.method === 'DELETE') {
    // Establish connection to database
    const client = await clientPromise;
    const db = client.db('kdafov');

    // Check if delete ID is passed
    if (req.query && req.query.id) {
        await db.collection("reviews_on_hold").deleteOne({ _id: new ObjectId(req.query.id) });
        res.status(200).send('[200 OK]');
    } else {
        res.status(400).send('[400 BAD REQUEST] : Missing compulsory header/body component.');
    }
  } else if (req.method === 'PUT') {
    if (req.body && req.body.name && req.body.relation && req.body.content) {
        const client = await clientPromise;
        const db = client.db('kdafov');
        const collection = db.collection('reviews');
        await collection.insertOne({
            name: req.body.name,
            relation: req.body.relation,
            content: req.body.content
        });
        res.status(200).send('[200 OK]');
    } else {
        res.status(400).send('[400 BAD REQUEST] : Missing compulsory header/body component.');
    }
  } else {
    res.status(405).send('[405 INVALID METHOD] Invalid method of request. Method: ' + req.method + ' not permitted!');
  }
}