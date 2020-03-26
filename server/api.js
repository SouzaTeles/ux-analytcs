const http = require("http");
const fs = require("fs");

function api_get(req, res){
    fs.readdir(`${__dirname}/data/`, (err, files)=>{
        if(err) throw err;
        res.write(JSON.stringify(files));
        // console.log(files)
    })
}

function handleServer(req, res){
    console.log(req.url);
    if(req.url === "/api/"){
        // res.end("funcionando")
        api_get(req, res);
    }
}
http.createServer(handleServer).listen(3001)