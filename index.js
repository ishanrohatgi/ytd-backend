import express, { response } from 'express';
import ytdl from 'ytdl-core';
import cors from 'cors';
const app = express();
app.use(cors());

app.get('/',  cors() ,async (req, res)=>{
const url = req.query.url;
const title =req.query.title;
const videoInfo = await ytdl.getInfo(url);
const format = videoInfo.formats.reduce((prev, current) => {
    if (prev.resolution == null) return current;
    if (current.resolution == null) return prev;
    return parseInt(current.resolution.slice(0, -1)) > parseInt(prev.resolution.slice(0, -1)) ? current : prev;
  });

 ytdl(url, { format }).pipe(res);
 res.header('Content-Disposition', `attachment; filename=${title}.mp4`);
})


app.listen(3000,()=>{
    console.log('server-created')
})
