// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/whoami", function (req, res) {
  let ipaddress;
  let language;
  let software;

  if (!!req && !!req["headers"]) {
    const requestHeader = req["headers"];
    const forwardedForHeaderName = requestHeader["x-forwarded-for"];
    const realIpHeaderName = requestHeader["x-real-ip"];
    const headerAcceptLanguage = requestHeader["accept-language"];
    const headerUserAgent = requestHeader["user-agent"];

    language = headerAcceptLanguage ? headerAcceptLanguage : "";
    software = headerUserAgent ? headerUserAgent : "";

    let splittedIps = forwardedForHeaderName
      ? forwardedForHeaderName.split(",")
      : [];

    ipaddress = splittedIps.length
      ? splittedIps[0]
      : realIpHeaderName
      ? realIpHeaderName
      : req.connection.remoteAddress;
  }

  res.json({ ipaddress, language, software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
