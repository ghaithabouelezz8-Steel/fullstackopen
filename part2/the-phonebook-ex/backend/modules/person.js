const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URI
mongoose.connect(url,{ family:4})

const personSchema = new mongoose.Schema({
    name:String,
    number:String
})

personSchema.set('toJSON',{transform:(document,returnedObject)=>{
    returnedObject.id===returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
    }})

module.exports=mongoose.model('Person',personSchema)




