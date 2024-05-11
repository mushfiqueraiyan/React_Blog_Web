import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import Navbar from "./components/header/Navbar"
import Foot from "./components/footer/Foot"
import { Outlet } from "react-router-dom"


function App() {



  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        } else{
          dispatch(logout())
        }
    }) 
    .finally(()=> setLoading(false))
  }, [])
  

return !loading ? (
  <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full block">
          <Navbar/>
          <main>
            <Outlet/>
          </main>
          <Foot/>
      </div>
  </div>
) : null
}

export default App
