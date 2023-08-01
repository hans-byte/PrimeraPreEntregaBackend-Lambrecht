import express from 'express';
const PORT = 8080;
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api/products',productsRouter);
app.use('/api/carts',cartRouter);

app.listen(PORT,()=>{
    console.log("Server listening on port: "+ PORT);
});