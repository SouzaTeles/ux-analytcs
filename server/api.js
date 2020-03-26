const http = require("http");
const fs = require("fs");

const handleServer(req, res){
    res.end("funcionando")
}
http.createServer(handleServer).listen(3001)