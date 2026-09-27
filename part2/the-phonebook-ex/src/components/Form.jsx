const Form=(props)=>{
  const{onSubmit,onNameChange,onNumberChange,nameValue,numberValue}=props
  return(
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue}
          onChange={onNameChange} />
        </div>
        <div>
          number: <input value={numberValue} 
          onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

}

export default Form