import products from './ProductManager.js';
import express from 'express';
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.listen(PORT,()=>{
    console.log("Server listening on port: "+ PORT);
});

app.get('/api/products', async (req,res)=>{
    try {
        const getProducts = await products.getProducts() 
        const limit = req.query.limit
        if(limit){
            return res.json(getProducts.slice(0,limit))
        }else{
            return res.json(getProducts)
        }
    } catch (error) {
        res.send(error)
    }

})

app.get('/api/products/:id', async (req, res) =>{
    try {
        const id = parseInt(req.params.id)
        const getSpecificProduct = await products.getProductById(id);
        console.log(getSpecificProduct)
        return res.send(getSpecificProduct)
    } catch (error) {
        res.send(error);
    }

    
})