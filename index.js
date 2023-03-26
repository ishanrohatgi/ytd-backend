import express, { response } from 'express';
import ytdl from 'ytdl-core';
import cors from 'cors';
const app = express();
app.use(cors());

app.get('/',  cors() ,async (req, res)=>{
const url ='https://www.youtube.com/watch?v=DSb7tmVcZm4';
const title ='file';
const videoInfo = await ytdl.getInfo(url);

 ytdl(url, { quality: 'highest' }).pipe(res);
 res.setHeader('Content-Type', 'video/mp4');
 res.header('Content-Disposition', `attachment; filename=${title}.mp4`);
})


app.listen(3000,()=>{
    console.log('server-created')
})
