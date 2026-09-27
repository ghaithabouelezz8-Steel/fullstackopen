import axios from "axios"
import { useState,useEffect } from "react"

const DetailsOf =(props)=>{
  const [weather,setWeather] =useState(null)
  const {value , setSearchedCountry , api}=props

  useEffect(()=>{
    if(value.length===1 && value[0].capital )
    {axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value[0].capital}&units=metric&appid=${api}`)
          .then(response=>setWeather(response.data))
  }
  },[value])

  if(value.length>10)
    return <p>be more specific </p>
  else if(value.length<10 && value.length>1) {
    return value.map(c=><div key={c.ccn3}>{c.name.common} <button onClick={()=>{ setSearchedCountry(c.name.common)
     
    } }>Show</button></div>)

  }
  else if(value.length ===1 ){
    return value.map(c=><div key={c.ccn3}> 
    <h2> {c.name.common}</h2>
    <p>Capital {c.capital}
    </p>
    <p>
      Area {c.area}
    </p>
    <b>languages</b>
    <ul>
    {
    Object.values(c.languages).map((l)=>
      <li key={l}>{l}</li>
    )
    }
    </ul>
    <img src={c.flags.png} 
    width={150}/>

    <h2>Weather in {c.capital}</h2>
    <p>Temperature </p>
    {weather?
    <div>
      <p>Temperature {weather.main.temp} Celsius</p>
            <p>Wind {weather.wind.speed} m/s</p>
    </div> : <p>loading...</p> }
    
    </div>)
    
  }

}


export default DetailsOf