import { useState , useEffect } from 'react'
import Form from './components/Form'
import ShowingName from './components/ShowingName'
import ShowingNameDetails from './components/showingNameDetails'
import personService from './services/person'
import SuccessfulMessage from './components/SccessfulMessage'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const[newNumber,setNewNumber]=useState('')
  const[showName,setShowName]=useState('')
  const [successfulAddition,setSuccessfulAddition]=useState(null)

  useEffect(()=>{
    personService
    .getAll()
    .then(response=>setPersons(response.data))
  },[])


   const addPerson=(event)=>{
    event.preventDefault()
    for(let i=0;i<persons.length;i++){
      if(newName===persons[i].name && newNumber===persons[i].number)
        
        return (alert(`${newName} is already added to phonebook`))

      else if(newName===persons[i].name && newNumber!==persons[i].number)

        if(window.confirm(`${newName} is already added to phonebook , do you wanna replace the old number`))
        {const changedPersonNumber ={...persons[i],number:newNumber}
         return personService
          .update(persons[i].id,changedPersonNumber)
          .then(response=>{setPersons(persons.map(person=>person.id !==persons[i].id ? person:response.data))
             setNewName('')
            setNewNumber('')
          }
        )
        }
      else { setNewName('')
            setNewNumber('')
          return }
    }
   const Person={
    'name':newName,
    'number':newNumber
    
   }
  
   personService
   .create(Person)
   .then(response=>{setPersons(persons.concat(response.data))
    setSuccessfulAddition(`Added ${Person.name}`)
    setTimeout(() => {
      setSuccessfulAddition(null)
    }, 5000);
    setNewName('')
    setNewNumber('')
   })
   
   }
   

   const handleDelete=(id)=>{
   
   if(window.confirm('do you really wanna delete this person ?'))
   personService
    .remove(id)
   .then(response=>setPersons(persons.filter(person=>person.id!==id)))
   }

   const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
    
   }
   const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
   }
   
   const handleNameToShow=(event)=>{
    setShowName(event.target.value)
   }
   const nameToShow=showName===''?persons : persons.filter(person=>person.name.toLowerCase().includes(showName.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessfulMessage message={successfulAddition} />

        <ShowingName showingValue={showName} showingChange={handleNameToShow}/>
      <h1>add a new</h1>
      <Form onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} nameValue={newName} numberValue={newNumber}/>
      <h2>Numbers</h2>
      ...
      <ShowingNameDetails nameDetails={nameToShow}  handleDelete={handleDelete} />
    </div>
  )
}

export default App