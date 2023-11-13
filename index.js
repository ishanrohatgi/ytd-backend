import express, { response } from 'express';
import ytdl from 'ytdl-core';
const app = express();
import cors from 'cors';
app.use(cors());

app.get('/',async (req, res)=>{
const videoURL = req.query.url; // Assuming the URL is passed as a query parameter
 
  const outputPath = `{req.query.title}.mp4`; // Output file name

  try {
    const videoInfo = await ytdl.getInfo(videoURL);
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });

    if (videoFormat) {
      res.header('Content-Disposition', `attachment; filename="${videoInfo.title}.mp4"`);
      ytdl(videoURL)
        .pipe(res);
    } else {
      res.status(404).send('No suitable video format found.');
    }
  } catch (error) {
    res.status(500).send('Error downloading the video.');
  }
})


app.listen(3000,()=>{
    console.log('server-created')
})
