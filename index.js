const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;


// middleware 
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://car-doctor:${process.env.DB_PASS}@cluster0.ia4w5yl.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const serviceCollection = client.db('carDoctor').collection('services');

    app.get('/services', async(req, res)=> {
        const cursor = serviceCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();h
  }
}
run().catch(console.dir);







app.get('/', (req, res)=> {
    res.send('Car Doctor is Running')
})

app.listen(port, ()=> {
    console.log(`Car Doctor Server is Running on Port ${port}`);
})
