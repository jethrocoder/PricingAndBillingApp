const express=require('express')
const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const {db}=require('./database/db')
const {pricingAndCodificationRoute}=require('./Routes/pricingAndCodification')
const {invoiceRoute}=require('./Routes/invoiceForm')

app.use('/',express.static(__dirname+'/public'))

app.set('view engine','hbs')
app.use('/api',pricingAndCodificationRoute)
app.use('/api',invoiceRoute)

const PORT=process.env.PORT || 4444
db.sync()
.then(()=>{
    console.log('Database Synced')
    app.listen(PORT,console.log(`server started at https://localhost:${PORT}`))
})
.catch((err)=>{console.error(err)})