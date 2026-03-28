import { useState } from "react";
import { useNavigate } from "react-router"
import { apiRequest } from "../api";


function Signup(){
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [role,setRole]=useState("USER");
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("")
        try{
            await apiRequest("/auth/signup","POST",{email,username,password,role});
            navigate("/login");
        }
        catch(err){
            setError("Signup Failed");
        }

    }
    return(
            <div  className="flex bg-blue-50 w-full h-185 items-center  justify-center">
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
                    <span className="font-semibold text-xl">Signup</span>
                </div>
                <div className="flex flex-col ml-4 mt-4   ">
                    <form onSubmit={handleSubmit} className="flex flex-col  ">
                        {error && (
                        <div className="text-red-500 mb-2 text-center">{error}</div>
                        )}
                        <input 
                          type="text" 
                          placeholder="username" 
                          id="username"  name="username" 
                          className="p-2  shadow shadow-black"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        <input 
                          type="email" 
                          placeholder="email" 
                          id="email"  
                          name="email" 
                          className="p-2  shadow shadow-black"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <input 
                          type="text" 
                          placeholder="password" 
                          id="password" 
                          name="password" 
                          className="p-2  shadow shadow-black"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <select 
                           name="role" 
                           id="role" 
                           className="p-1  shadow shadow-black"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button 
                           type="submit" 
                           className="bg-blue-500 mt-10 p-2 hover:bg-blue-700" >signup
                        </button>
                    </form>
                </div>
                <div className="flex flex-col mt-2 items-center ml-3">
                    <div className="flex">
                        <span>Or</span>
                    </div>
                    <button className="hover:text-blue-500 hover:underline " onClick={()=>navigate("/login")}>Login</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Signup