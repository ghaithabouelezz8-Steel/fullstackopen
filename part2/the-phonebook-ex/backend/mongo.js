
const mongo = require('mongoose')

const password = process.argv[2]

const url=`mongodb+srv://ghaithabouelezz8_db_user:${password}@cluster0.pmrwfdc.mongodb.net/phoneBook?appName=Cluster0`

mongo.set('strictQuery',false)
mongo.connect(url,{family : 4})
const personSchema = new mongo.Schema({
  name:String,
  number:String,
})
const Person=mongo.model('Person',personSchema)
const person= new Person({
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
})
Person.find({}).then(result=>{
    result.forEach(person=>console.log(result))
    mongo.connection.close()}
)