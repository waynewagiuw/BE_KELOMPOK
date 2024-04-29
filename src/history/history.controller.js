const express = require('express')
const router = express.Router();
const { getAllHistorys, getHistoryById, createHistory, deleteHistoryById, ubdateHistoryById } = require("./history.service")

router.get("/", async (req, res) => {
    try {
        const historys = await getAllHistorys()

        res.status(200).json({
            status: "success get the database",
            data: historys,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    const newHistorysData = req.body
    const history = await createHistory(newHistorysData)
    res.send({
        data: history,
        message: "Data berhasil dimasukan"
    })
});

router.delete("/:id", async (req, res) => {
    try {
        const historyId = (req.params.id)
        await deleteHistoryById(parseInt(historyId))

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
    const historyId = parseInt(req.params.id);
    try {
        const historys = await getHistoryById(parseInt(historyId));

        res.status(200).json({
            status: "data berhasil didapatkan",
            data: historys,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("tidak ada data");
    }
});

router.put("/:id", async (req, res) => {
    const historyId = req.params.id;
    const historyData = req.body;

    if (
        !(
            historyData.tanggal_transaksi &&
            historyData.nama_produk &&
            historyData.jenis_produk &&
            historyData.deskripsi
        )
    ) {
        return res.status(400).send("Some fields are missing")
    }
    try {
        const history = await ubdateHistoryById(parseInt(historyId), historyData)
           
        res.send({
            message: "Data berhasil diperbarui",
            data: history,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/:id", async (req, res) => {
    const historyId = req.params.id;
    const historyData = req.body;

    try {
        const history = await ubdateHistoryById(parseInt(historyId), historyData)
           
        res.send({
            message: "Data berhasil diperbarui",
            data: history,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router