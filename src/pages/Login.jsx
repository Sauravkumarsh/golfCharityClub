import { useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Login({setToken,setRole,setId}) {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password ,setPassword]=useState();
    const [error,setError]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        try{
            const res=await apiRequest("/auth/login","POST",{email,password});
            localStorage.setItem("token",res.token);
            setToken(res.token);
            localStorage.setItem("role",res.role);
            localStorage.setItem("id",res.id);
            setId(res.id);
            setRole(res.role);
            navigate("/home");
        }
        catch(err){
            setError("Login failed")
        }
    }

    return(
        <div>
           <Header /> 
          <div  className="flex bg-blue-50 w-full h-185  mt-15 items-center  justify-center">
            <div className=" flex w-200 h-150 items-center bg-gray-100 ">
                <div className=" w-1/2 h-full">
                <img 
                 src="https://idronline.org/wp-content/uploads/2020/12/OGFB4B0.jpg.webp" 
                 alt="preview" 
                 className="w-full h-full" 
                />
                </div>
                <div className="bg- w-1/2 h-full">
                <div className=" flex flex-col mt-2 items-center">
                    <span className="font-bold text-2xl mt-2 mb-4">Health Care</span>
                    <span className="font-semibold text-xl">User Login</span>
                </div>
                <div className="flex flex-col ml-4 mt-4   ">
                    <form onSubmit={handleSubmit} className="flex flex-col  ">
                        {error && (
                            <div className="text-red-500 mb-2 text-center">{error}</div>
                        )}
                        <input 
                         type="email"
                         placeholder="email" 
                         id="email"  name="email" 
                         className="p-2  shadow shadow-black"
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                        required
                        />
                        <input 
                          type="text" 
                          placeholder="password" 
                          id="password" name="password" 
                          className="p-2  shadow shadow-black"
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                          required
                        />
                        <button 
                          type="submit" 
                          className="bg-blue-500 mt-10 p-2 hover:bg-blue-700" >login
                        </button>
                    </form>
                </div>
                <div className="flex flex-col mt-2 items-center ">
                    <button className="hover:text-blue-500 underline" onClick={()=>navigate("/signup")}>Create an Account?</button>
                </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    )
}
export default Login;