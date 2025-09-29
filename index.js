const express = require('express');
const bodyParser = require('body-parser');
const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('public'));

app.post('/package', async (req, res) => {
    const { html, css, js, py } = req.body;

    const zip = new JSZip();

    // Create Livo folder structure
    zip.file("index.html", html);
    zip.file("style.css", css);
    zip.file("main.js", js);
    zip.file("app.py", py);
    zip.file("livo.exe", "");         // placeholder for user-side compiler
    zip.file("livo.html", "");        // optional website output
    zip.file("README.md", "# Livo Project\nInstructions...");

    const content = await zip.generateAsync({ type: "nodebuffer" });

    const outputPath = path.join(__dirname, 'LivoProject.zip');
    fs.writeFileSync(outputPath, content);

    res.download(outputPath, 'LivoProject.zip', err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error downloading ZIP');
        }
    });
});

app.listen(3000, () => {
    console.log('Livo server running at http://localhost:3000');
});