import express, { response } from 'express';
import ytdl from 'ytdl-core';
import cors from 'cors';
const app = express();
app.use(cors());

app.get('/',  cors() ,async (req, res)=>{
const url = req.query.url;
const title =req.query.title;

 ytdl(url, { quality: 'highest' }).pipe(res);
 res.header('Access-Control-Allow-Origin', 'https://youtube-saver.netlify.app/');
 res.setHeader('Content-Type', 'video/mp4');
 res.header('Content-Disposition', `attachment; filename=${title}.mp4`);
})


app.listen(3000,()=>{
    console.log('server-created')
})
