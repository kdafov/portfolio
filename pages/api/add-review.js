import clientPromise from '@/lib/mongoConfig';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (req.body && req.body.name && req.body.relation && req.body.content) {
            // Encode user input
            const name = encodeURIComponent(req.body.name);
            const relation = encodeURIComponent(req.body.relation);
            const content = encodeURIComponent(req.body.content);

            // Establish connection to database
            const client = await clientPromise;
            const db = client.db('kdafov');
            const collection = db.collection('reviews_on_hold');

            // Add new data
            const operation = await collection.insertOne({
                name,
                relation,
                content
            });

            // Return status
            if (operation.acknowledged && operation.acknowledged === true) {
                res.status(200).send('[200 OK] : Success!');
            } else {
                res.status(500).send('[500 Internal Server Error] : There was an error. Please try again.');
            }

        } else {
            res.status(400).send('[400 BAD REQUEST] : Missing compulsory header/body component.');
        }
    } else {
        res.status(405).send('[405 INVALID METHOD] Invalid method of request. Method: ' + req.method + ' not permitted!');
    }
}