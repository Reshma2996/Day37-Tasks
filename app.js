const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const folderPath = path.join(__dirname, 'files');

// Create a file with the current date-time as the filename
app.post('/create-file', (req, res) => {
    const currentDateTime = new Date().toISOString().replace(/:/g, '-');
    const filename = `${currentDateTime}.txt`;
    const filePath = path.join(folderPath, filename);

    fs.writeFile(filePath, currentDateTime, (err) => {
        if (err) {
            return res.status(500).send('Error creating file');
        }
        res.send(`File ${filename} created successfully`);
    });
});

// Retrieve all text files in the folder
app.get('/get-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        const textFiles = files.filter(file => path.extname(file) === '.txt');
        res.json(textFiles);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
