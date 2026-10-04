const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URI
mongoose.connect(url,{ family:4})

const personSchema = new mongoose.Schema({
    name:{type:String,
        required:true,
        minLength:3
    },
    number:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message:props=>`${props.value} is not a valid phone number`
        }
    }
})

personSchema.set('toJSON',{transform:(document,returnedObject)=>{
    returnedObject.id=returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
    }})

module.exports=mongoose.model('Person',personSchema)




