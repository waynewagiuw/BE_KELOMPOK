const express = require('express')
const router = express.Router();
const { getAllProducts, getProductById, createProduct, deleteProductById, ubdateProductById } = require("./product.service")

router.get("/", async (req, res) => {
    try {
        const products = await getAllProducts()

        res.status(200).json({
            status: "success get the database",
            data: products,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    const newProductsData = req.body
    const product = await createProduct(newProductsData)
    res.send({
        data: product,
        message: "Data berhasil dimasukan"
    })
});

router.delete("/:id", async (req, res) => {
    try {
        const productId = (req.params.id)
        await deleteProductById(parseInt(productId))

        res.status(200).json({
            status: "success",
            message: "Data berhasil dihapus",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("tidak ada data");
    }
});

router.get("/:id", async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const products = await getProductById(parseInt(productId));

        res.status(200).json({
            status: "data berhasil didapatkan",
            data: products,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("tidak ada data");
    }
});

router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    if (
        !(
        productData.nama_produk &&
        productData.jenis_produk &&
        productData.harga &&
        productData.stok &&
        productData.gambar &&
        productData.deskripsi &&
        productData.nilai_pulsa &&
        productData.operator 
        )
    ) {
        return res.status(400).send("Some fields are missing")
    }
    try {
        const product = await ubdateProductById(parseInt(productId), productData)
           
        res.send({
            message: "Data berhasil diperbarui",
            data: product,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    try {
        const product = await ubdateProductById(parseInt(productId), productData)
           
        res.send({
            message: "Data berhasil diperbarui",
            data: product,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router