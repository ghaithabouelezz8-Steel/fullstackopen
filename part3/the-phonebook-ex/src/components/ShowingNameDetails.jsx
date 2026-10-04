const ShowingNameDetails=(props)=>{
  const{nameDetails,handleDelete}=props
  return(
     <div>{nameDetails.map((person)=>
       <p key={person.id}>{person.name} {person.number}
        
        <button onClick={()=>handleDelete(person.id)} >delete</button>
        </p>
      
      
      )}
      
  </div>)
}
export default ShowingNameDetails