const express = require('express');
const app = express();

const {fetchAndUpdate} = require("./modules");

//trying this
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});





/*
const http = require("http");
http.createServer((_, res) => res.end("Alive")).listen(8080)
*/
/*
app.get("/", (req, res) => {

  res.send('Hello World!');
  
})

app.get("/fetch", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.json(await fetchAndUpdate())
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started");
});
*/


