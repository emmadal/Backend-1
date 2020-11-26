import express from 'express'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import auth from './routes/auth.js'
import users from './routes/users.js'
import friendship from './routes/friendship.js'
import message from './routes/message.js'
import upload from './routes/uploadhandler.js'
import room from './routes/RoomChat.js'
import path from 'path'
import "./middleware/auth.js"
import notification from './routes/notifications.js'

const dbUrl = "mongodb+srv://Wakandha:Wakandha2020@cluster0.osxre.mongodb.net/wakandha?retryWrites=true&w=majority"

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

const app = express()
const port = process.env.PORT || 3000;
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