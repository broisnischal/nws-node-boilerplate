/* eslint-disable consistent-return */
import express from 'express';
import path from 'path';
import fs from 'fs';
import { marked } from 'marked';

const app = express();
const docsPath = path.join(__dirname, '.');

app.use('/docs', express.static(docsPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(docsPath, 'index.html'));
});

app.get('/docs/:file', (req, res) => {
  const { file } = req.params;
  const filePath = path.join(docsPath, `${file}.md`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    const htmlContent = marked(data);
    res.send(htmlContent);
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Documentation server running on http://localhost:${port}`);
});
