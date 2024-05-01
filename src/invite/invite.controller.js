const express = require('express');
const router = express.Router();
const { getAllInvites, getInviteById, createInvite, deleteInviteById, ubdateInviteById } = require("./invite.service")

router.get("/", async(req, res) => {
    try {
        const invites = await getAllInvites()

        res.status(200).json({
            status: "success get the database",
            data: invites,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async(req, res) => {
    try {
        const newInvitesData = req.body;
        const invite = await createInvite(newInvitesData);
        res.status(201).json({
            data: invite,
            message: "Data berhasil dimasukkan"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal memproses permintaan"
        });
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const inviteId = (req.params.id)
        await deleteInviteById(parseInt(inviteId))

        res.status(200).json({
            status: "success",
            message: "Data berhasil dihapus",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("tidak ada data");
    }
});

router.get("/:id", async(req, res) => {
    const inviteId = parseInt(req.params.id);
    try {
        const invites = await getInviteById(parseInt(inviteId));

        res.status(200).json({
            status: "data berhasil didapatkan",
            data: invites,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("tidak ada data");
    }
});

router.put("/:id", async(req, res) => {
    const inviteId = req.params.id;
    const inviteData = req.body;

    if (!(
            inviteData.nama_sender &&
            inviteData.nama_receiver &&
            inviteData.kode_sender &&
            inviteData.kode_receiver &&
            inviteData.statur &&
            inviteData.tanggal_bergabung
        )) {
        return res.status(400).send("Some fields are missing")
    }
    try {
        const invite = await ubdateInviteById(parseInt(inviteId), inviteData)

        res.send({
            message: "Data berhasil diperbarui",
            data: invite,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/:id", async(req, res) => {
    const inviteId = req.params.id;
    const inviteData = req.body;

    try {
        const invite = await ubdateInviteById(parseInt(inviteId), inviteData)

        res.send({
            message: "Data berhasil diperbarui",
            data: invite,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;