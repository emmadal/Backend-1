const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const auth = require('./routes/auth.js')
const users = require('./routes/users.js')
const friendship = require('./routes/friendship.js')
const room = require('./routes/RoomChat.js')
const upload = require("./routes/uploadhandler.js");
const message = require("./routes/message.js");
const path = require('path')
const notification = require("./routes/notifications.js");
require("./middleware/auth.js");

const dbUrl = "mongodb+srv://Wakandha:Wakandha2020@cluster0.osxre.mongodb.net/wakandha?retryWrites=true&w=majority"

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

const app = express()
const port = process.env.PORT || 5000;
var __dirname = path.resolve();



app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*'),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next()
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/'))

// console.log('__ :>> ', __dirname + '/photos');

app.use("/auth", auth)
app.use("/users", users)
app.use("/friendship", friendship)
app.use("/roomchat", room)
app.use("/message", message)
app.use("/upload", upload)

// app.use("/friendships", friendship)

app.use("/notifications", notification)

console.log(new Date(), `mongoose version: ${mongoose.version}`);

app.listen(port, () => console.log(`Listen on http://localhost:${port}`,))