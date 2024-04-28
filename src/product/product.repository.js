const prisma = require("../db")

const findProducts = async () => {
    const products = await prisma.product.findMany()
    return products
}

const findProductsById = async (id) => {
    const products = await prisma.product.findUnique({
        where:{
            id,
        }
    })
    return products
}

const insertProduct = async (newProductsData) => {
    try {
        const product = await prisma.product.create({
            data: {
                nama_produk: newProductsData.nama_produk,
                jenis_produk: newProductsData.jenis_produk,
                harga: parseFloat(newProductsData.harga),
                stok: parseInt(newProductsData.stok), 
                gambar: newProductsData.gambar,
                deskripsi:  newProductsData.deskripsi,
                nilai_pulsa:  parseFloat(newProductsData.nilai_pulsa),
                operator:  newProductsData.operator
            }
        });
        return product;
    } catch (error) {
        console.error(error);
        throw new Error("Gagal membuat produk");
    }
}


const deleteProduct = async (id) =>{
     await prisma.product.delete({
        where: {
            id,
        },
    });
}

const ubdateProduct = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id: parseInt(id),
        },
        data: {
            nama_produk: productData.nama_produk,
            jenis_produk: productData.jenis_produk,
            harga: parseFloat(productData.harga), 
            stok: parseInt(productData.stok), 
            gambar: productData.gambar,
            deskripsi:  productData.deskripsi,
            nilai_pulsa:  parseFloat(productData.nilai_pulsa),
            operator:  productData.operator
        },
    });
    return product
}

module.exports={
    findProducts,
    findProductsById,
    insertProduct,
    deleteProduct,
    ubdateProduct
}