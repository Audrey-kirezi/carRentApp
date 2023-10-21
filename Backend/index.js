const express = require("express")

const app = express()
const dotenv = require('dotenv')

const mongoose = require ('mongoose')

dotenv.config({path: './.env'})

app.use(express.json())


let PORT = process.env.PORT
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=>console.log("Connected to database successfully"))
.catch(err=>console.log(err))

app.listen( PORT ,()=>{
    console.log(`server is listening on port ${PORT}`);
})