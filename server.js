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
const HooksRouter = require('./api/routes/conekta/hooks')
const doctorsRouter = require('./api/routes/doctors')

app.use('/api', clientRouter)
app.use('/api', orderRouter)
app.use('/api', chargeRouter)
app.use('/hooks', HooksRouter)
app.use('/api', doctorsRouter)

app.listen('3000',() => {
    console.log('express running')
})