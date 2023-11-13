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
res.status(206);
// Get start and end bytes from request headers
  const range = req.headers.range;
  const fileSize = parseInt(videoInfo.videoDetails.lengthSeconds) * 1000000;
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range?.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

  // Set response headers for partial content
  res.setHeader('Content-Length', end - start + 1);
  res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
 ytdl(url, { format }).pipe(res, { start, end });
 res.setHeader('Content-Type', 'video/mp4');
 res.header('Content-Disposition', `attachment; filename=${title}.mp4`);
})


app.listen(3000,()=>{
    console.log('server-created')
})
