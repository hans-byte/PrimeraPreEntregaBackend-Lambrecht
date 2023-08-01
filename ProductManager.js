import fs from 'fs'

export class ProductManager {
    constructor(path){
        this.path = path
    }
    
    async getProducts(){
        try{
            if (fs.existsSync(this.path)){
                const productsArray = await fs.promises.readFile(this.path,"utf-8")
                return JSON.parse(productsArray)
            }else{
                return []
            }
        }catch(error){
            return error
        }

    }
    
    async getProductById(idPassed){
        try{
            const existingProducts = await this.getProducts()
            const productFinded = existingProducts.find((x) => x.id === idPassed)
            if(productFinded){
                return productFinded
            }else{
                return console.log("The id passed does not correspond to any product")
            }
        } catch(error){
            return error
        }

    }
    
    async addProduct(obj){
        try{
            const existingProducts = await this.getProducts()
            let id 
            if(!existingProducts.length){
                id = 1;
            }else{
                id = existingProducts[existingProducts.length - 1].id + 1;
            }
            const codeRepited = existingProducts.find((x) => x.code === obj.code)
            if(codeRepited){
                return console.log("Code repited. It won´t be added")
            }else{
                const newArray = {id,...obj}
                existingProducts.push(newArray)
                await fs.promises.writeFile(this.path,JSON.stringify(existingProducts))
                return newArray
            }
        }catch(error){
            return error
        }

    }

   
    async deleteProductById(idToBeDeleted){
        try{
            const existingProducts = await this.getProducts()
            const idCorrect = existingProducts.find(x => x.id === idToBeDeleted)
            if (idCorrect){
              const newArray = existingProducts.filter(x => x.id !== idToBeDeleted)
              newArray = await fs.promises.writeFile(this.path, JSON.stringify(newArray));
              return newArray
            }else{
              console.log("The id doesn´t match to any of our products")
            }
        } catch(error){
            return error
        }
    }
    
    async updateProduct(idToBeUpdated, obj){
        try{
            const existingProducts = await this.getProducts()
            const indexToBeUpdated = existingProducts.findIndex(x => x.id === idToBeUpdated) 
          if(indexToBeUpdated !== -1){
                const productToBeUpdated = existingProducts[indexToBeUpdated]
                existingProducts[indexToBeUpdated] = {...productToBeUpdated,...obj} 
                const newArray = await fs.promises.writeFile(this.path,JSON.stringify(existingProducts));
                return newArray;
                
        }else{
            return console.log("There´s no match between the id passed and the DB array")
        }
        }catch(error){
            return error
        }

    }
}

const products = new ProductManager('./Products.json');
export default products;