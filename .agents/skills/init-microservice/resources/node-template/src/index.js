const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: `Welcome to {{service_name}}` });
});

app.listen(port, () => {
  console.log(`{{service_name}} listening at http://localhost:${port}`);
});
