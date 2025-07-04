import { useState } from "react"
import Users from "./Users"
import Posts from "./Posts";

function App() {
  const [userId, setUserId] = useState(1);

  
  return (
    <>
    {/* <Users id={userId}/> */}
    <Posts/>
    
    </>
  )
}

export default App
