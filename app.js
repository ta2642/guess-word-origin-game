const express = require('express');
var path = require('path');
const fs = require('fs')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/word', function(req, res) {
    const dblist = [];
    const map = {0: "english", 1: "french"};

    const allFileContents = fs.readFileSync('./equi-list.csv', 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line =>  {
        dblist.push(line)
    });
    //get a random line from file, choose one
    const randomItem = dblist[Math.floor(Math.random()*dblist.length)];
    const list = randomItem.split(/,/);
    const option = Math.floor(Math.random()*list.length);
    

    const optionToSend = {"word": list[option], 
                    "origin": map[option],
                    "equivalent": list[option]}

    res.send(optionToSend);
});


app.get('/contact', function(req, res) {
    res.send('this is contacts page');
});

app.get('/contact/:id', function(req, res) {
    res.send('this is contacts page for ' + req.params.id);
});

app.listen(3000, ()=> console.log("server listening on port 3000"));


