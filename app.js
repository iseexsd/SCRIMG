const express = require('express')
const scrambleImage = require("scramble-image")
const app = express()
const port = 80

/* Define function for escaping user input to be treated as
   a literal string within a regular expression */
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Define functin to find and replace specified term with replacement string */
function replaceAll(str, term, replacement) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'image/png'})
    var args = req.url.substr(2, req.url.length).split("&")
    args[1] = args[1].substr(0, args[1].length-4)
    return res.end(scrambleImage.genImage(args[0].split("=")[1], replaceAll(replaceAll(args[1].split("=")[1], "%20", " "), "%27", "'"), "default"))
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))