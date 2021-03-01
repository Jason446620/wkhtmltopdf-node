const express = require('express')
const path = require('path')
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const app = express()    
const PORT = process.env.PORT || 3000

var PDFDocument, doc;



app.get('/pdfkit', function (req, res) {
    var fs = require("fs");

    PDFDocument = require('pdfkit');

    doc = new PDFDocument;

    doc.pipe(fs.createWriteStream("pdf/pdfkit/"+uuidv4()+'.pdf'));

    doc.fontSize(25).text('Some text with an embedded font!', 100, 100);

    doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);

    doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

    doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();

    doc.addPage().fillColor("blue").text('Here is a link!', 100, 100).underline(100, 100, 160, 27, {
      color: "#0000FF"
    }).link(100, 100, 160, 27, 'http://google.com/');

    doc.end();
    
    res.send('Done!')
});

app.get('/wkhtmltopdf', function (req, res) {

    try {
        wkhtmltopdf("index.html", {
            output: 'pdf/wkhtmltopdf/'+uuidv4()+'.pdf',
            pageSize: 'letter'
        }); 
    } catch (error) {
        console.log(error.toString())
    }
    
    res.send('Done!')
});

app.get('/', function (req, res) {
    res.send('Hello world!')
});
// listening
app.listen(PORT, console.log(`Server started on port ${PORT}`))
