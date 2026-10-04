const ErrorMessage=(props)=>{
const{errorMessage}=props
const Styling={
    color:'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle:'solid',
    borderRadius:5,
    padding:10,
    marginBottom:10
}
if(errorMessage)
    return(
<p style={Styling}>
    {errorMessage}
</p>)
return null
}

export default ErrorMessage