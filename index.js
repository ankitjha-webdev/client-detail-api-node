const http = require("http");
const fs = require("fs");
var requests = require('requests');

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let details = tempVal.replace("{%name%}", orgVal.name);
    details = details.replace("{%company%}", orgVal.company);
    return details;
};

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        requests(
            "https://run.mocky.io/v3/8260aa5d-8af8-4cff-999e-6e81b217f0ba",
          )
            .on('data',  (chunk) => {
                const objData = JSON.parse(chunk);
                const arrData = objData.clients;
                const listData = arrData.map((val) =>  replaceVal(homeFile, val)).join("");
                res.write(listData);    
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);

               res.end();
            });
    } else{
        res.end("404 not found"); 
    }
});

server.listen(8000, "127.0.0.1");