let express = require("express");
let twilio = require("twilio");
let env = require("./.env");

let app = express();
const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// const TWILIO_ACCOUNT_SID = "TWILIO_ACCOUNT_SID";
// const TWILIO_CHAT_SERVICE_SID = "TWILIO_CHAT_SERVICE_SID";
// const TWILIO_API_KEY = "TWILIO_API_KEY";
// const TWILIO_API_SECRET = "TWILIO_API_SECRET";

app.get("/token", function(req, res) {
  let username = req.query.username;
    console.log("username is: ", username);
  let token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_CHAT_SERVICE_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      {
          identity: username
      }
  );


let grant = new ChatGrant({ serviceSid: process.env.TWILIO_CHAT_SERVICE_SID });
// let grant = new ChatGrant({ serviceSid: credentials.TWILIO_CHAT_SERVICE_SID });

  token.addGrant(grant);
  const tokenJwt = token.toJwt();
  console.log("token: " + tokenJwt);

  res.send(tokenJwt);
});

app.get("/", function(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.use(express.static(__dirname + "/public"));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`ChatPug app listening on port ${port}!`);
});