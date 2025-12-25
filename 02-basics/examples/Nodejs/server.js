const express = require('express');
const app = express();
const PORT = process.env.PORT || 4500;

app.get('/', (req, res) => {
  res.send('Hello from Docker Learning Journey - Du Débutant example Node.js application!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});