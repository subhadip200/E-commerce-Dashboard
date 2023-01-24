import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Addproduct = () => {
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [category, setcategory] = useState("")
    const [company, setcompany] = useState("")

    const [error, seterror] = useState(false)

    const navigate = useNavigate();

    const handleaddproduct = async () => {
        console.log(!name)

        if (!name || !price || !category || !company) {
            seterror(true);
            return false;

        }


        let userId = JSON.parse(localStorage.getItem('user'))._id
        console.log(userId)

        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {

                'Content-Type': 'application/json'
            },
        })
        result = await result.json()
        console.log(result)
        
        if(result)
        {
            navigate('/')
        }


    }


    return (
        <div className="product">
            <h1>Add product</h1>
            <input type="text" className="inputBox" placeholder="enter product name" value={name} onChange={(e) => { setname(e.target.value) }} />
            {error && !name && <span className="invalid-input">enter valid name</span>}

            <input type="text" className="inputBox" placeholder="enter product price" value={price} onChange={(e) => { setprice(e.target.value) }} />
            {error && !price && <span className="invalid-input">enter valid price</span>}

            <input type="text" className="inputBox" placeholder="enter product category" value={category} onChange={(e) => { setcategory(e.target.value) }} />
            {error && !category && <span className="invalid-input">enter valid category</span>}

            <input type="text" className="inputBox" placeholder="enter company" value={company} onChange={(e) => { setcompany(e.target.value) }} />
            {error && !company && <span className="invalid-input">enter valid company </span>}

            <button className='appbutton' type='button' onClick={handleaddproduct}>Add product</button>

        </div>
    )
}

export default Addproduct;