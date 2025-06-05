const express = require('express');
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors);

app.use(express.json());

app.post('/send-email', async(req, res) => {
  const { fromEmail, toEmail, uploadedFiles } = req.body;
  console.log("From:", fromEmail);
  console.log("To:", toEmail);
  console.log("Files:", uploadedFiles);

  return res.status(200).json({ message: 'Email data received!' });
  
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
