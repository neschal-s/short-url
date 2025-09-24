import { nanoid } from "nanoid";
import shortid from "shortid";
import Url from "../models/url.js";
export async function handleGeneratenewShortUrl(req, res) {
  const body = req.body;
  if (!body || !body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  let id = null;
  try {
    id = await Url.findOne({ redirectURL: body.url });
    console.log(id);
  } catch (err) {
    return res.status(500).json({ err });
  }

  if (id) {
    return res.status(200).json({ id: id.shortId });
  }

  const shortID = shortid();
  await Url.create({
    shortId: shortID,
    redirectURL: body.url,
    visitedHistory: [],
  });
  res.json({ id: shortID });
}

export async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await Url.findOne({shortId});
    if(!result){
        return res.status(404).json({error:"Short URL not found"});
    }
    return res.json({
        url:result.redirectURL,
        totalClicks:result.visitHistory.length,
        visitHistory:result.visitHistory,
    });

}
