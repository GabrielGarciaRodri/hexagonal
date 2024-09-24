// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const ProductRepository = require('../../domain/repositories/productRepository');

class productService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getProductById(id) {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found'}));
        }
        return product;
    }

    async getAllProducts() {
        const product = await this.productRepository.getAll();
        if (!product) {
            throw new Error(JSON.stringify({status: 404, message: 'Products not found'}));
        }
        return product;
    }

    async createProduct(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.productRepository.save(data);
    }

    async updateProduct(id, data) {
        const updatedProduct = await this.productRepository.updateById(id, data);
        if (!updatedProduct) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found or could not be updated'}));
        }
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await this.productRepository.deleteById(id);
        if (!deletedProduct) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found or could not be deleted'}));
        }        
        return deletedProduct;
    }
    
    async searchProductsByName(name) {
        return await this.productRepository.searchByName(name);
    }
}

module.exports = productService;