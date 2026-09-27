import Course from "./Course"
const Courses=(props)=>{
  const{courses}=props
  return(
    <div>
      {courses.map(course=>
        <Course key={course.id} course={course}/>
        )}
      
    </div>
  )
}
export default Courses