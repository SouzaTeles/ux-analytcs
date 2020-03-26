const http = require("http");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
function api_get(req, res) {
  fs.readdir(DATA_DIR, (err, files) => {
    if (err) throw err;
    const filesNo = files.map(f => f.replace(".json", ""));
    res.write(JSON.stringify(filesNo));
    res.end();
    // console.log(files)
  });
}

function api_id_get(req, res) {
    const file
    res.write("funcionou");
    res.end();
}

function handleServer(req, res) {
  console.log(req.url);
  if (req.url === "/api/") {
    // res.end("funcionando")
    api_get(req, res);
  }
  else if(req.url.indexOf("/api/") > -1 && req.method == "GET") {
      api_id_get(req, res);
  }
}
http.createServer(handleServer).listen(3001);
