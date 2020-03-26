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
  const fileName = req.url.split("/")[2];
  const file = path.join(DATA_DIR, fileName) + ".json";

  console.log(file);
  console.log(fileName);
  fs.readFile(file, (err, json) => {
    if (err) throw err;
    else if (json) {
      console.log("antes");
      console.log(json.toString());
      console.log("depois");
      res.write(json.toString());
      res.end();
    }
  });
}

function api_id_post(req, res) {
  const fileName = req.url.split("?name=")[1];
  const file = path.join(__dirname, fileName) + ".json";
  console.log(fileName);
  console.log(file)
  let data = [];
  req.on("data", chunck => data.push(chunck));
  req.on("end", () => {
    const body = Buffer.concat(data).toString();
    fs.writeFile(file, body, err => {
      if (err) throw err;
      res.write(body);
    });
    console.log(data);
    res.write("aaa");
    res.end();
  });
}

function handleServer(req, res) {
  res.writeHeader(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  });

  console.log(req.url);
  if (req.url === "/api/") {
    // res.end("funcionando")
    api_get(req, res);
  } else if (req.url.indexOf("/api/") > -1 && req.method == "GET") {
    api_id_get(req, res);
  } else if (req.url.indexOf("/api/") > -1 && req.method == "POST") {
    api_id_post(req, res);
  } else {
    res.end("sem rota");
  }
}
http.createServer(handleServer).listen(3001);
