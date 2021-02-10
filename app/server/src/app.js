import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  res.send('hello world');
});
app.listen(3000, () => {
  console.log('listening on port 3000...');
});
