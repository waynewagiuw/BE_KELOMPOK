const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, deleteUserById, ubdateUserById } = require("./user.service")

router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers()

        res.status(200).json({
            status: "success get the database",
            data: users,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const newUsersData = req.body;
        const user = await createUser(newUsersData);
        res.status(201).json({
            data: user,
            message: "Data berhasil dimasukkan"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal memproses permintaan"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const userId = (req.params.id)
        await deleteUserById(parseInt(userId))

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
    const userId = parseInt(req.params.id);
    try {
        const users = await getUserById(parseInt(userId));

        res.status(200).json({
            status: "data berhasil didapatkan",
            data: users,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("tidak ada data");
    }
});

router.put("/:id", async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    if (
        !(
        userData.nama_lengkap &&
        userData.alamat &&
        userData.email &&
        userData.nomor_telepon &&
        userData.tanggal_lahir &&
        userData.jenis_kelamin &&
        userData.pekerjaan
        )
    ) {
        return res.status(400).send("Some fields are missing")
    }
    try {
        const user = await ubdateUserById(parseInt(userId), userData)

        res.send({
            message: "Data berhasil diperbarui",
            data: user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/:id", async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    try {
        const user = await ubdateUserById(parseInt(userId), userData)

        res.send({
            message: "Data berhasil diperbarui",
            data: user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
