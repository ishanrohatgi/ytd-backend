import express, { response } from 'express';
import ytdl from 'ytdl-core';
const app = express();


app.get('/',async (req, res)=>{
const url = req.query.url;
const title =req.query.title;

 ytdl(url, { quality: 'highest' }).pipe(res);
 res.setHeader('Content-Type', 'video/mp4');
 res.header('Content-Disposition', `attachment; filename=${title}.mp4`);
})


app.listen(3000,()=>{
    console.log('server-created')
})