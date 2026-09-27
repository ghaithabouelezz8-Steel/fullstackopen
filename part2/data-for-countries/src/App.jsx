import { useState , useEffect} from 'react'
import axios from 'axios'
import DetailsOf from './components/DetailsOf'


function App() {
  const [countries,setCountries]=useState([])
 const [searchedCountry,setSearchedCountry]=useState('')
 

 const api_key=import.meta.env.VITE_SOME_KEY

 useEffect(()=>{
  axios
  .get('https://studies.cs.helsinki.fi/restcountries/api/all')
  .then(response=>{setCountries(response.data) 
   
  })
 },[])


 const handleChange=(event)=>{
  setSearchedCountry(event.target.value)
 }


 const countriesToShow =searchedCountry.trim()===''
 ?[]
  :countries.filter((country)=>
    { return country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())})
return(
  <div>
    find countries <input value={searchedCountry}
    onChange={handleChange}
    />
    <DetailsOf value={countriesToShow} setSearchedCountry={setSearchedCountry} api={api_key}  />

  </div>
)
}

export default App
