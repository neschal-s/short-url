import express from 'express';
import mongoose from 'mongoose';
import urlRoute from './routes/url.js';
import connectToMongoDB from './connect.js'
import URL from './models/url.js';
const app=express();
const PORT=3000; 
import cors from 'cors';


connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));


app.use(cors());
app.use(express.json());

app.use('/url',urlRoute);

app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{visitHistory:{visitHistory:Date.now()},}
    },
    {new:true}
    );
    if (!entry) return res.status(404).send("URL not found");
    res.redirect(entry.redirectURL);
})



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})