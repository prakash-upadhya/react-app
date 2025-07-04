import axios from "axios";

export const fetchUsers = async(id:number)=>{
  // console.log(id)
 const URL = `https://jsonplaceholder.typicode.com/users/${id}`;
    try {
      const response  = await axios.get(URL);
   
     console.log([...response?.data])
      return response?.data
    } catch (error) {
      console.log("Error fetching users", error);
       throw Error("Error fetching users");
    }
}