const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const Transaction = require('./models/transaction.js')

const port = 4000
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send("ok")
})
app.get('/api/',async(req, res)=>{
    var js = []
    await mongoose.connect('mongodb+srv://gulati_sahb:<pw>@cluster0.y94qfsh.mongodb.net/')
    js = await Transaction.find({})
    res.send(js)
})
app.post('/api/', async (req, res) => {
    try {
        await mongoose.connect('mongodb+srv://gulati_sahb:Aa%4012345@cluster0.y94qfsh.mongodb.net/')
        const { price, name, description, datetime } = req.body;
        const newTrans = await Transaction.create({ price, name, description, datetime })
        res.json(newTrans)
        console.log("done adding")
    } catch (err) {
        console.log(err);
    }
})
app.delete('/api/:id',async (req, res)=>{
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error;
        }
        await mongoose.connect('mongodb+srv://gulati_sahb:Aa%4012345@cluster0.y94qfsh.mongodb.net/')
        await Transaction.findByIdAndDelete(id)
        console.log('deleted')
        res.json({message:'item deleted'})
    }catch(err){
        console.log(err)
    }
})
app.listen(port, () => {
    console.log(`working at http://localhost:${port}`)
})
