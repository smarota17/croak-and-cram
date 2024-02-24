const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const app = express();

const PORT =3000;
const directory = __dirname + "/templates/";

app.listen(PORT, () => console.log (`listening on port: ${PORT}`));

app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) =>{
    res.sendFile(directory + 'index.html');
})

app.get('/tasklist', (req,res) =>{
    res.sendFile(directory + 'tasklist.html');
})
