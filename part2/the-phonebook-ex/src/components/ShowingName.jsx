const ShowingName=(props)=>{
  const{showingValue,showingChange}=props
  return(
    <div>
       filter shown with <input value={showingValue} 
       onChange={showingChange}/>

        </div>
  )
}

export default ShowingName