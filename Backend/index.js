const express = require("express")
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes= require("./routes/user.routes")

const mongoose = require ('mongoose')

dotenv.config({path: './.env'})

app.use(cors());
app.use(express.json())
app.use("/users",userRoutes)


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