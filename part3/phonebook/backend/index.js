const express =require('express')
const app=express()
app.use(express.json())
const morgan =require('morgan')
const cors =require('cors')
app.use(cors())
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

let persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/info',(request,response)=>{
    const d=new Date().toUTCString()

    response.send(`<p>Phone book has info for ${persons.length} people</p> 
        <br/> 
        ${d}`)
    
})

app.get('/api/persons/:id',(request,response)=>{
const id=request.params.id
const person=persons.find(person=>person.id===id)
if(person)
   return response.status(200).json(person)
else return response.status(404).end()

})
app.delete('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    persons=persons.filter(person=>person.id!==id)
    response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
    const body = request.body
    
    if(!body.name || !body.number){
        return response.status(400).json({error:'missing name or number'})
    }
    const exists =persons.find(person=>person.name===body.name)
    
     if(exists)
        return response.status(400).json({error:'you must use a unique name'})

    const newPerson={
        id:generatedId(),
        name:body.name,
        number:body.number
        
    }
    persons=persons.concat(newPerson)
    response.json(newPerson)
})
const PORT =process.env.PORT || 3001
app.listen(PORT,()=>{console.log(`server running on port ${PORT}` )})

