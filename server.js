import express from 'express'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import auth from './routes/auth.js'
import users from './routes/users.js'
import "./middleware/auth.js"

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

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*'),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next()
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", auth)

app.use("/users", users)

app.listen(port, () => console.log(`Listen on http://localhost:${port}`,))