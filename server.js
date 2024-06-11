const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const folderPath = path.join(__dirname, 'files');

// Middleware to parse JSON
app.use(express.json());

// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `${timestamp}.txt`;
    const content = timestamp;

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFile(path.join(folderPath, filename), content, (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.send(`File ${filename} created successfully`);
    });
});

// Endpoint to retrieve all text files in the specified folder
app.get('/get-files', (req, res) => {
    if (!fs.existsSync(folderPath)) {
        return res.status(404).send('Folder does not exist');
    }

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading folder');
        }

        const textFiles = files.filter(file => path.extname(file) === '.txt');
        res.json(textFiles);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
