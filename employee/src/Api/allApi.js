import axios from "axios";


const base_url="http://localhost:3000"

export const addEmployee=async(data)=>{
    return await axios.post(`${base_url}/addemp`,data)
}


export const getEmployees=async ()=>{
    return await axios.get(`${base_url}/employees`)
}

export const deleteEmployee=async(id)=>{
    return await axios.delete(`${base_url}/deleteemp/${id}`)
}

export const updateEmployee=async(id,data)=>{
    return await axios.put(`${base_url}/updateemp/${id}`,data)
}