import { Router } from "express";
import carts from '../../CartManager.js';
const router = Router();

router.post('/:cid/products/:pid', async(req, res) => {
    const {cid,pid} = req.params;
    try {
        const addProduct = await carts.addProduct(+cid,+pid);
        return res.json(addProduct);
    } catch (error) {
        res.send(error)
    }

})

router.get('/:id', async (req, res) =>{
    try {
        const id = parseInt(req.params.id)
        const getSpecificCart = await carts.getCartsById(id);
        return res.json(getSpecificCart)
    } catch (error) {
        return res.send(error);
    }
}
)

router.post('/', async(req, res) => {
    try {
        const newArray = await carts.createCart();
        return res.json(newArray);
    } catch (error) {
        res.send(error)
    }

})


export default router;
