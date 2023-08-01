import fs from 'fs';

export class CartManager {
    constructor(path) {
        this.path = path;
    }

     
    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsArray = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(cartsArray)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    
    async createCart() {
        try {
            const carts = await this.getCarts()
            const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
            const newCart = { id, products: [] }
            carts.push(newCart);
            return await fs.promises.writeFile(this.path, JSON.stringify(carts))
        } catch (error) {
            return error;
        }
    }

    
    async getCartsById(id) {
        try {
            const carts = await this.getCarts();
            const newArray = carts.find(x => x.id === id);
            if (newArray) {
                return newArray;
            } else {
                return console.log("The id passed does not correspond to any cart")
            }
        } catch (error) {
            return error
        }
    }



    async addProduct(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(x => x.id === cartId)
            const productIndex = cart.products.findIndex(x => x.product === productId);
            if (productIndex === -1) {
                cart.products.push({ product: productId, quantity: 1 })
            } else {
                cart.products[productIndex].quantity++;
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return carts

        } catch (error) {
            return error
        }

    }

}


const carts = new CartManager('./Carts.json');
export default carts;