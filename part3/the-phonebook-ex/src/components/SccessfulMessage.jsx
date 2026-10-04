const SuccessfulMessage =({message})=>{
const Styling={
    color:'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle:'solid',
    borderRadius:5,
    padding:10,
    marginBottom:10
}
if(message===null)
    return null
return(
    <div style={Styling}>
        {message}
    </div>
)
}
export default SuccessfulMessage