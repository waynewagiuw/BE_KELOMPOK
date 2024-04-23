const prisma = require("../db")
const { findProducts, findProductsById, insertProduct, deleteProduct, ubdateProduct } = require("./product.repository")

const getAllProducts = async () => {
    const products = await findProducts()
    return products
}

const getProductById = async (id) => {
    try {
        const product = await findProductsById(id)
        return product
    } catch (err) {
        console.error(err);
        throw new Error("Internal server error")
    }
}

const createProduct = async (newProductsData) => {
    try {
        const product = await insertProduct(newProductsData)
        return product
    } catch (error) {
        throw error
    }
}

const deleteProductById = async (id) => {

    
    try {
        const product = await getProductById(id)
        
        if (!product) {
            throw Error("Product not found")
        }; await deleteProduct(id)
        return product
    } catch (err) {
        console.error(err);
        throw Error("Internal server error")

    }
}

const ubdateProductById = async (id, productData) =>{
    await getProductById(id)
    try {
        const product = await ubdateProduct(id, productData)
        return product
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    ubdateProductById
}
