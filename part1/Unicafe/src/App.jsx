import { useState } from 'react'
const StatisticLine =({text,value})=><tr><td>{text}</td><td>{value}</td></tr>
  
 
const Statistics=({good,neutral,bad,total,avg,positive})=>{

if(good===0 && neutral===0 && bad===0)
  return(<div><h1>statistics</h1>
    <p>No feedback given</p></div>)
return(
  <div>
    <h1>Statistics</h1>
  <table>
  <tbody>
  <StatisticLine text='good' value={good}/>
  <StatisticLine text='neutral' value={neutral}/>
  <StatisticLine text='bad' value={bad}/>
  <StatisticLine text='all' value={total}/>
  <StatisticLine text='average' value={avg}/>
  <StatisticLine text='positive' value={`${positive} %`}/>
  </tbody>
  </table>
  </div>
)
}
const Button =({onClick,text})=><button onClick={onClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal]=useState(0)
  const [avg,setAvg]=useState(0)
  const [positive,setPositive]=useState(0)

  const HandleGood =()=>{
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = total +1
    setTotal(updatedTotal)
    setPositive((updatedGood/updatedTotal)*100)
   setAvg((updatedGood-bad)/updatedTotal)
  }
   const HandleBad =()=>{
    const updatedBad =bad +1
    setBad(updatedBad)
    const updatedTotal = total +1
    setTotal(updatedTotal)
    setPositive((good/updatedTotal)*100)
    setAvg((good-updatedBad)/updatedTotal)
  }
   const HandleNeutral =()=>{
    const updatedNeutral=neutral+1
    setNeutral(updatedNeutral)
    const updatedTotal = total +1
    setTotal(updatedTotal)
    setPositive((good/updatedTotal)*100)
    setAvg((good-bad)/updatedTotal)
  }
 



  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={HandleGood} text='good'/>
      <Button onClick={HandleNeutral} text='neutral'/>
      <Button onClick={HandleBad} text='bad'/>
      
      
     
      <Statistics  good={good} neutral={neutral} bad={bad} total={total} avg={avg} positive={positive}/>
    </div>
  )
}

export default App