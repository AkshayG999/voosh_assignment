
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route = require("./routes/route")
require('dotenv').config()
const cors = require('cors')

let uri = "mongodb+srv://AkshayGaikwad:Akshay143@cluster0.ii90wme.mongodb.net/vooshFoodes";
let port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

mongoose.set('strictQuery', false);
mongoose.connect(uri)
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err))


app.use('/', route)


app.listen(port, () => {
    console.log("Server is running on " + port)
})





