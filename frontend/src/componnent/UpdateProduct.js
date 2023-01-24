import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UpdateProduct = () => {
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [category, setcategory] = useState("")
    const [company, setcompany] = useState("")

    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
       getproductdetails();
    },[])

    const getproductdetails=async ()=>{
        //console.log(params.id);
        let result=await fetch(`http://localhost:5000/product/${params.id}`)
        result= await result.json()
        setname(result.name);
        setprice(result.price)
        setcategory(result.category)
        setcompany(result.company)

    }




    const handleupdate = async () => {
        console.log(name,price,category,company)
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body:JSON.stringify({name,price,category,company}),
           headers:{
            'Content-Type':'application/json'
           }
        })
        result=result.json()
        if(result){
            navigate("/")
        }
        
    }


    return (
        <div className="product">
            <h1>Update product</h1>
            <input type="text" className="inputBox" placeholder="enter product name" value={name} onChange={(e) => { setname(e.target.value) }} />
            

            <input type="text" className="inputBox" placeholder="enter product price" value={price} onChange={(e) => { setprice(e.target.value) }} />
           

            <input type="text" className="inputBox" placeholder="enter product category" value={category} onChange={(e) => { setcategory(e.target.value) }} />
            

            <input type="text" className="inputBox" placeholder="enter company" value={company} onChange={(e) => { setcompany(e.target.value) }} />
            

            <button className='appbutton' type='button' onClick={handleupdate}>update product</button>

        </div>
    )
}

export default UpdateProduct ;