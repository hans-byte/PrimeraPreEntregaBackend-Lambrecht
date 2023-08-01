import { Router } from "express";
import products from '../../ProductManager.js';
const router = Router();

router.get('/', async (req,res)=>{
    try {
        const getProducts = await products.getProducts() 
        const limit = req.query.limit
        if(limit){
            return res.json(getProducts.slice(0,limit))
        }else{
            return res.json(getProducts)
        }
    } catch (error) {
        return res.send(error)
    }

})

router.get('/:id', async (req, res) =>{
    try {
        const id = parseInt(req.params.id)
        const getSpecificProduct = await products.getProductById(id);
        return res.json(getSpecificProduct)
    } catch (error) {
        return res.send(error);
    }
}
)

router.delete('/:id',async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const newArray = await products.deleteProductById(id);
        return res.json(newArray)
    } catch (error) {
        return res.send(error);
    }
})

router.post('/', async(req, res) => {
    try {
        const newArray = await products.addProduct(req.body);
        return res.json(newArray);
    } catch (error) {
        res.send(error)
    }

})

router.put('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const mod = req.body;
    try {
        const newArray = await products.updateProduct(id,mod);
        return res.json(newArray)
    } catch (error) {
        res.send(error)        
    }
})

export default router;
