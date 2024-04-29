const express = require('express');
const router = express.Router();
const { getAllMissions, getMissionById, createMission, deleteMissionById, ubdateMissionById } = require("./mission.service")

router.get("/", async (req, res) => {
    try {
        const missions = await getAllMissions()

        res.status(200).json({
            status: "success get the database",
            data: missions,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const newMissionsData = req.body;
        const mission = await createMission(newMissionsData);
        res.status(201).json({
            data: mission,
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
        const missionId = (req.params.id)
        await deleteMissionById(parseInt(missionId))

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
    const missionId = parseInt(req.params.id);
    try {
        const missions = await getMissionById(parseInt(missionId));

        res.status(200).json({
            status: "data berhasil didapatkan",
            data: missions,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("tidak ada data");
    }
});

router.put("/:id", async (req, res) => {
    const missionId = req.params.id;
    const missionData = req.body;

    if (
        !(
            missionData.title &&
            missionData.description &&
            missionData.point &&
            missionData.gambar &&
            missionData.logo &&
            missionData.duration
        )
    ) {
        return res.status(400).send("Some fields are missing")
    }
    try {
        const mission = await ubdateMissionById(parseInt(missionId), missionData)

        res.send({
            message: "Data berhasil diperbarui",
            data: mission,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/:id", async (req, res) => {
    const missionId = req.params.id;
    const missionData = req.body;

    try {
        const mission = await ubdateMissionById(parseInt(missionId), missionData)

        res.send({
            message: "Data berhasil diperbarui",
            data: mission,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
