const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// user: dbuser1
// pass: Z4UsBcMAo2QAqJAh



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.yyhbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userscollection = client.db("Carhaunter").collection("users");
        app.get('/items', async (req, res) => {
            const query = {};
            const cursor = userscollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });
        // app.get('/items/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const item = await userscollection.findOne(query);
        //     res.send(item);
        // });
    }
    finally {

        // await client.close();
    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('run my car haunter wait until')
});
app.listen(port, () => {
    console.log('car haunter is running again and again');
})