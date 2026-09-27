const Course=(props)=>{
  const{course}=props
  
  const total = course.parts.reduce((accumulator,currentValue)=>accumulator+currentValue.exercises ,0)
  return(
    <div>
        <h1>{course.name}</h1>
      {course.parts.map(part=>
      <p key={part.id}>
        {part.name}{part.exercises}
      </p>)}
      <b>{total}</b>
    </div>
  )
}
export default Course