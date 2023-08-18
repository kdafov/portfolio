import clientPromise from '@/lib/mongoConfig';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        if (req.body && 
                ( (req.body.name && req.body.email && req.body.message) 
                || 
                (req.body.email && req.body.message && req.body.message === 'CV REQUEST') )
            ) {
            // Encode user input
            const name = encodeURIComponent(req.body.name);
            const email = encodeURIComponent(req.body.email);
            const message = encodeURIComponent(req.body.message);

            // Establish connection to database
            const client = await clientPromise;
            const db = client.db('kdafov');
            const collection = db.collection('requests');

            // Add new data
            const operation = await collection.insertOne({
                name,
                email,
                message
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