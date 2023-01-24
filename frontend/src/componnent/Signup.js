import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



const Signup = () => {
    const [name, setname] = useState("");
    const [mail, setmail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user')

        if (auth) {
            navigate('/')
        }

    })


    const collectdata = async () => {
        console.log(name, mail, password)

        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, mail, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        result = await result.json()
        console.log(result)

        localStorage.setItem("user", JSON.stringify(result.result))  //localstorage e store hche
        localStorage.setItem("token", JSON.stringify(result.auth))
        if (result) {
            navigate('/')
        }
    }


    return (
        <div className='register'>
            <h1>Register</h1>
            <input className='inputBox' type="text" value={name} onChange={(e) => { setname(e.target.value) }} placeholder='enter name' />
            <input className='inputBox' type="text" value={mail} onChange={(e) => { setmail(e.target.value) }} placeholder='enter mail' />
            <input className='inputBox' type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder='enter password' />
            <button className='appbutton' type='button' onClick={collectdata}>sign up</button>
        </div>
    )
}

export default Signup;