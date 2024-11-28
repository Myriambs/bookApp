const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5001
const db= require('./config/db')
const bookRoute = require('./routes/bookRoute')
const userRoute = require('./routes/userRoute')





db()
app.use(express.json())



app.use('/books',bookRoute)
app.use('/user',userRoute)




app.listen(port,err=>{
    err?console.log(err): console.log(`go to the port ${port}`)
})

