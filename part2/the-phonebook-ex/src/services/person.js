import axios from "axios";

const baseUrl='/api/persons'
const getAll=()=>{
   return axios
    .get(baseUrl)
}

const create=(person)=>{
  return  axios
    .post(baseUrl,person)
    
}

const remove=(id)=>{
    return axios.delete(`${baseUrl}/${id}`)
}

const update=(id,data)=>{
    return axios.put(`${baseUrl}/${id}`,data)
}

export default {create , getAll , remove , update}