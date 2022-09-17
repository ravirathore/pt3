
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const ffeed  = require('feed').Feed;
const express = require('express')
var fs      = require('fs');
const app = express()
const PORT = process.env.PORT || 5000;
//const port = 3000
var xx2;

app.get('/', (req, res) => {
    xy();
  //res.send('Hello World!')
  res.send(xx2)
  
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  var dirPath = __dirname + "/rssfeed.xml";
async function xy(){

const url = 'http://engold.ptinews.com/';
const response = await fetch(url);
const body = await response.text();

//create new feed
const feed = new ffeed({
  title: 'PT',
  description: 'PT',
  id: 'pt',
  link: 'pt',
  image: 'pt',
});




let $ = cheerio.load(body);

let title = $('title');
console.log(title.text());
//let xy1 = $('a[class=catLatestHeadli]').();
$('a[class=catLatestHeadli]').each((_, e) => {

    let row  = $(e).text();

    console.log(`${row}`);
    console.log(row);
    date = new Date()
    
    feed.addItem({
        title: row,
        id: row,
        link: row,
        description: row,
        content: row,
        date: date
      });
      
});
var rssdoc = feed.rss2();
xx2=rssdoc;
        fs.writeFile(dirPath, rssdoc, function(err) {
           if(err) { 
               return console.log(err); 
           }
       });
   //   res.render('index');

//console.log(xy1);
}

//xy();