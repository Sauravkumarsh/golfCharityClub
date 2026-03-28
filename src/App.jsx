import { BrowserRouter as Router,Route,Routes,Navigate } from "react-router"
import { useState,useEffect } from "react"
import Home from "./pages/Home";
import AdminLoginPage from "./pages/AdminLogin";
import WinnersAdminPanel from "./pages/winners";
import AdminWinnersList from "./pages/winners";
import GolfAdminPanel from "./pages/winners";
import CharityManagement from "./pages/Charity";
import GolfCharityDashboard from "./pages/Report";
import AdminHomePage from "./pages/AdminHomePage";
import UserHomePage from "./pages/UserHomePage";
import GolfCharityClub from "./pages/UserDashboard";



function App() {

  const [token,setToken]=useState("");
  const [role,setRole]=useState(null);
  const [id,setId]=useState("");

  useEffect(()=>{
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
    setId(localStorage.getItem("id"));
  },[]);

  const handleLogout=()=>{
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("role");
    setRole(null);
  }  




  return (
    <>
    <Router>
    <Routes>

      <Route path="/home" element={<Home />} />
      <Route path="/admin-login" element={<AdminLoginPage setToken={setToken} setRole={setRole} setId={setId } />} />
      <Route path="/winners" element={<GolfAdminPanel />} />
      <Route path="/charity" element={<CharityManagement />} />
      <Route path="/report" element={<GolfCharityDashboard />} />
      <Route path="/adminhome" element={<AdminHomePage  />} />
      <Route path="/userhome" element={<UserHomePage />} />
      <Route path="/dashboard" element={<GolfCharityClub />} />
    
      
    </Routes>

    </Router>
    </>

  )
}

export default App
