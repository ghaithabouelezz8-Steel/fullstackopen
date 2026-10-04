const express =require('express')
const app=express()
app.use(express.json())
const morgan =require('morgan')
const cors =require('cors')
const PersonService =require('./modules/person')

const errorHandler=(error,request,response,next)=>{
console.error(error.message)
if(error.name==='CastError')
    return response.status(400).send({error:'malformatted id'})
else if(error.name==='ValidationError')
    return response.status(400).json({error:error.message})
next(error)
}

const unkownEndpoint =(request,response)=>{
    response.status(404).send({error:'unkown endpoint'})
}

app.use(cors())
require('dotenv').config()


morgan.token('body',request=>{
    return request.method ==='POST'? JSON.stringify(request.body):''
})
app.use(morgan
    (
        ':method :url :status :res[content -length] - :response-time ms :body'
    )
)
app.use(express.static('dist'))

const generatedId= ()=>{
    const maxId=persons.length>0?
    Math.max(...persons.map(person=>Number(person.id))):0
    return String(maxId +1)
}




app.get('/api/persons',(request,response , next)=>{
    PersonService.find({}).then(
        person=>response.json(person)
    )
    .catch(error=>next(error))
})

app.get('/api/info',(request,response,next)=>{
    const d=new Date().toUTCString()

    PersonService.find({}).then(result=>
    response.send(`<p>Phone book has info for ${result.length} people</p> 
        <br/> 
        ${d}`))
    
})

app.get('/api/persons/:id',(request,response , next)=>{
const id=request.params.id
PersonService.findById(id)
.then(person=>
{
    if(person){
        response.json(person)
    }
    else  response.status(404).send({error:'this id does not exist'})

}
)
.catch(error=>next(error)
)

})
app.delete('/api/persons/:id',(request,response,next)=>{
    const id=request.params.id
   PersonService.findByIdAndDelete(id)
   .then(person=>response.status(204).end())
   .catch(error=>next(error))
})

app.post('/api/persons',(request,response ,next)=>{
    const body = request.body
    
    //if(!body.name || !body.number){
       // return response.status(400).json({error:'missing name or number'})
  // }
    
    PersonService.findOne({name:body.name})
    .then(exists=>{if(exists)
        return response.status(400).json({error:'name must be unique'})
    })
     

    const newPerson= new PersonService({
        
        name:body.name,
        number:body.number
        
    })
    newPerson.save()
    .then(person=>response.json(person))
    .catch(error=>next(error))
})

app.put('/api/persons/:id',(request,response,next)=>
{const {name,number}=request.body
const id=request.params.id
PersonService.findById(id).then(
    person=>{
        if(!person)
            response.status(404).send({error:'this id does not exist'})
       
        person.name=name
        person.number=number
        person.save().then(person=>response.json(person))
    }
)
.catch(error=>next(error))
})
app.use(unkownEndpoint)

app.use(errorHandler)
const PORT =process.env.PORT 

app.listen(PORT,()=>{console.log(`server running on port ${PORT}` )})

