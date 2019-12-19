const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

const port = 3005;

const dir_files = __dirname + '/storage/';

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    let nameFile = req.files.file.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(dir_files + nameFile, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });

  app.get('/load', function(req, res) {
    res.sendFile(dir_files + req.query.name);
  });

app.listen(port, () => console.log(`start on port ${port}!`))