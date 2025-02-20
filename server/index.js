const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongo = require('./db');
const app = express();

app.set('view engine','ejs')
app.use(express.static('public'))

const PORT = process.env.PORT || 8181;


// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Dynamic route to handle all PDFs under /reports/
app.get('/reports/:fileName', (req, res) => {
  const fileName = req.params.fileName; // Extract the filename from the URL
  const filePath = path.join(__dirname, 'reports', fileName);

  // Ensure the file has a .pdf extension (optional security check)
  if (!fileName.endsWith('.pdf')) {
      return res.status(400).send('Only PDF files are supported');
  }

  // Set the headers for PDF download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

  // Send the file
  res.sendFile(filePath, (err) => {
      if (err) {
          console.error('Error sending file:', err);
          res.status(404).send('File not found');
      }
  });
});

  // Start the server
app.listen(PORT, () => {
console.log(`Server is running on port http://localhost:${PORT}`);
});
