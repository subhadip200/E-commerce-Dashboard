import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [mail,setmail]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate()

    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })

    const handlelogin= async ()=>{
        console.log(mail,password)
        let result=await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({mail,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json()
        console.log(result)

        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user))
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/')

        }
        else{
            alert("please enter valid details")
        }

        
    }



    return(
        <div className="login">
            <h1>Log in</h1>
            <input className="inputBox" type="text" placeholder="enter mail" value={mail} onChange={(e)=>{setmail(e.target.value)}}/>
            <input className="inputBox" type="password" placeholder="enter password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            <button className='appbutton' type='button' onClick={handlelogin}>Log in</button>
        </div>
    )
}

export default Login;