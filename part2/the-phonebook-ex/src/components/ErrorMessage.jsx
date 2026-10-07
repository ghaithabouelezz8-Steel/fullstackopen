const ErrorMessage=(props)=>{
    const {value}=props
    const Styling={color:'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle:'solid',
    borderRadius:5,
    padding:10,
    marginBottom:10

    }
if(value)
    return(<p style={Styling}>{value}</p>)
return null
}

export default ErrorMessage