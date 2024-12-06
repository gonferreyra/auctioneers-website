import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
