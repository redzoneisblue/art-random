const express = require('express');
const app = express();
const path = require('path');


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req,res) => {
    const response = await fetch("https://nekos.best/api/v2/endpoints");
    const data = await response.json();
    arr = Object.keys(data);
    res.render('tags.ejs', arr);
})

app.get('/show', async (req, res) => {
    let tag = req.query.tag;
    const response = await fetch(`https://nekos.best/api/v2/${tag}`);
    data = await response.json();
    console.log(data.results[0].url);
    res.render('index.ejs', data);
});

require('dotenv').config();
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if(err) console.error(err);
    else console.log(`The app is running on port ${port}`);
})