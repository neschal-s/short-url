import express from 'express';
import mongoose from 'mongoose';
import urlRoute from './routes/url.js';
import connectToMongoDB from './connect.js'
import URL from './models/url.js';
const app=express();
const PORT=3000; 
import cors from 'cors';




const MONGO_URL="mongodb+srv://admin:h1Gb0zWHrKUhsrjA@url-shortener-cluster.ixvmr1y.mongodb.net/short-url?retryWrites=true&w=majority&appName=url-shortener-cluster";


connectToMongoDB(MONGO_URL)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));



app.use(cors());
app.use(express.json());

app.use('/url',urlRoute);

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: new Date() } } },
      { new: true }
    );

    if (!entry) return res.status(404).send("URL not found");

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});




app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})