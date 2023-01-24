import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setproducts] = useState([]);

    useEffect(() => {
        getproducts();
    }, [])

    const getproducts = async () => {
        let result = await fetch('http://localhost:5000/product-list')
        result = await result.json();
        setproducts(result)
    }

    const deleteproduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "delete"
        })
        result=result.json()
        if (result) {
            getproducts();
        }

    }

    const searchhandle= async (event)=>{
        
        let key=event.target.value
        if(key){
        let result= await fetch(`http://localhost:5000/search/${key}`)
        result= await result.json()
        if(result){
            setproducts(result)
        }

        }else{
            getproducts()
        }
        
    }



    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type='text' onChange={searchhandle} className="search-product-box" placeholder='serch product' />
            <ul>
                <li>S.no</li>
                <li>name</li>
                <li>price</li>
                <li>category</li>
                <li>company</li>
                <li>operation</li>
            </ul>
            {
               products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteproduct(item._id)}>delete</button>
                            <Link to={"/update/"+item._id}>update</Link>
                        </li>
                    </ul>
                )
                :<h1>no result found</h1>
                
            }

        </div>
    )
}

export default ProductList;