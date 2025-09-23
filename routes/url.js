import express from "express";
import {handleGeneratenewShortUrl,handleGetAnalytics} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGeneratenewShortUrl);
// console.log(handleGetAnalytics.toString());
router.get("/analytics/:shortId",handleGetAnalytics);



export default router;
