const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

const clientRouter = require('./api/routes/clients')
const orderRouter = require('./api/routes/orders')
const chargeRouter = require('./api/routes/charges')

app.use('/payments',clientRouter)
app.use('/payments',orderRouter)
app.use('/payments',chargeRouter)

app.listen('3000',()=>{
    console.log('express running')
})