const express = require('express')
require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')
const cors = require('cors')

const Jwt=require('jsonwebtoken')
const jwtkey = 'e-commerce'

const app = express();

app.use(express.json())
app.use(cors())

app.post("/register", async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save();

    result = result.toObject();
    delete result.password

        Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                resp.send({ result: 'no token created' });
            }
            resp.send({result,auth:token})
        })
    
})

app.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.mail && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if(user){
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send({ result: 'no token created' })
                }
                resp.send({user,auth:token})
            })
        }
        else {
            resp.send({ result: 'no user found' })
        }
        
    }
    else {
        resp.send({ result: 'no user found' })
    }
})



app.post("/add-product", async (req, resp) => {

    let product = new Product(req.body);
    let result = await product.save();
    console.log(result)
    resp.send(result)
})

app.get("/product-list", async (req, resp) => {

    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    }
    else {
        resp.send({ result: "no result found" })
    }
})

app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result);
})


app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "no record found" })
    }

})


app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body

        }
    )
    resp.send(result)

})

app.get("/search/:key",verifyToken, async (req, resp) => {
  
    let result = await Product.find({
        '$or': [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }


        ]
    });

    resp.send(result)

})

//middleware
function verifyToken(greq,resp,next){
    console.log("middleware called")
    next();
  
}

app.listen(5000)