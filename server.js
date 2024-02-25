require("dotenv").config();
module.exports = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};

const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

const app = express();
app.use(express.json());

const { Configuration, OpenAIApi } = require("openai");

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

app.get('/users', (req,res) =>{
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data file');
            return;
        }

        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
})


app.get('/studyplan', (req,res) =>{
    res.sendFile(directory + 'studyplan.html');
})

app.get('/signup', (req,res) =>{
    res.sendFile(directory + 'signUp.html');
})
app.get('/viewProfile', (req,res) =>{
    res.sendFile(directory + 'viewProfile.html');
})


app.post('/signUp', upload.single('avatar'),(req,res) =>{
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    makeObject(req);
    res.sendFile(directory + 'index.html');


})
function makeObject(req){
    let jsonusers = fs.readFileSync("users.json", "utf-8");
    let jsontemp = JSON.parse(jsonusers);
    let users = [];
    for(var i in jsontemp){
        users.push(jsontemp[i]);
    }
    let visual = 0;
    let auditory = 0;
    let readWrite = 0;
    let style = '';
    if(req.body.question1 === 'Visual'){
        visual++;
    } else if (req.body.question1 === 'Auditory'){
        auditory++;
    } else if (req.body.question1 === 'readWrite'){
        readWrite++;
    }

    if(req.body.question2 === 'Visual'){
        visual++;
    } else if (req.body.question2 === 'Auditory'){
        auditory++;
    } else if (req.body.question2 === 'readWrite'){
        readWrite++;
    }

    if(req.body.question3 === 'Visual'){
        visual++;
    } else if (req.body.question3 === 'Auditory'){
        auditory++;
    } else if (req.body.question3 === 'readWrite'){
        readWrite++;
    }

    if(req.body.question4 === 'Visual'){
        visual++;
    } else if (req.body.question4 === 'Auditory'){
        auditory++;
    } else if (req.body.question4 === 'readWrite'){
        readWrite++;
    }

    if(req.body.question4 === 'Visual'){
        visual++;
    } else if (req.body.question4 === 'Auditory'){
        auditory++;
    } else if (req.body.question4 === 'readWrite'){
        readWrite++;
    }
    
    let max = Math.max(visual, auditory, readWrite);
    if(max === visual){
        style = 'Visual';
    } else if( max === auditory){
        style = 'Auditory';
    } else {
        style = 'Read and Write'
    }
    var obj = {
        firstName: `${req.body.firstName}`,
        lastName: `${req.body.lastName}`,
        username: `${req.body.username}`,
        password: `${req.body.password}`,
        studyStyle: `${style}`
    }
    users.push(obj);
    jsonusers =JSON.stringify(users);
    fs.writeFileSync("users.json", jsonusers, "utf-8");

}

