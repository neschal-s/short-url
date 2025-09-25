import express from 'express';
import mongoose from 'mongoose';
import urlRoute from './routes/url.js';
import connectToMongoDB from './connect.js'
import URL from './models/url.js';
const app=express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT || 3000; 

const MONGO_URL=process.env.MONGO_URL;
connectToMongoDB(MONGO_URL)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));



app.use(cors(
    {
  origin: process.env.CLIENT_URL,
  credentials: true,
}
));
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




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
