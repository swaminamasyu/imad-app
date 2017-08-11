var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = { 
    'article-one' : {
    title:'Article-one | Swami Namaysu',
    heading:'Article One',
    date:'Aug 11, 2017',
    content:`   <p>
                    This is the content for my first article. Ha ha.The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. 
                </p>
                <p>
                    This is the content for my first article. Ha ha.The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. 
                </p>
                <p>
                    This is the content for my first article. Ha ha.The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. 
                </p>`
},
    'article-two' : {
    title:'Article-Two | Swami Namaysu',
    heading:'Article Two',
    date:'Aug 12, 2017',
    content:`   <p>
                    This is the content for my Second article. Ha ha.The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. 
                </p>
                <p>
                    This is the content for my Second article. Ha ha.The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. 
                </p>
                <p>
                    This is the content for my Second article. Ha ha.The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. 
                </p>`
},
    'article-three' : {
    title:'Article-Three | Swami Namaysu',
    heading:'Article Three',
    date:'Aug 13, 2017',
    content:`   <p>
                    This is the content for my third article. Ha ha.The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. 
                </p>
                <p>
                    This is the content for my third article. Ha ha.The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. 
                </p>
                <p>
                    This is the content for my third article. Ha ha.The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. The quick brown for jumps over the lazy dog. 
                </p>`
}
};

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmltemplate = 
        `<html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class=container>
                <div>
                    <a href="/">Home</a>
                </div>  
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function (req, res) {
 counter = counter + 1;
 res.send (counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {
    var name = req.query.name;
    names.push(name);
    res.send (JSON.stringify(names));
});


app.get('/:articlename', function (req, res) {
 var articlename = req.params.articlename;
 res.send (createTemplate(articles[articlename]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
