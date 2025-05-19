import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import cors from 'cors'
import connetDB from './config/db.js'

dotenv.config()


const port = process.env.PORT || 5000

connetDB() //connect to DB


const app= express()

app.use(cors())

app.get('/', (req,res)=>{
    res.send('Api is running..')
})

app.get('/api/products', (req,res)=>{
    res.json(products)
})

app.get('/api/products/:id', (req, res)=>{
    const product = products.find((p)=>p._id === req.params.id)
    res.json(product)
})

app.listen(port, ()=> console.log(`the server is running on port ${port}`))