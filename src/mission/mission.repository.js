const prisma = require('../db');

const findMissions = async() => {
    const missions = await prisma.mission.findMany()
    return missions
}

const findMissionsById = async(id) => {
    const missions = await prisma.mission.findUnique({
        where: {
            id,
        }
    })
    return missions
}

const insertMission = async(newMissionsData) => {
    try {
        const mission = await prisma.mission.create({
            data: {
                title: newMissionsData.nama_lengkap,
                description: newMissionsData.alamat,
                point: newMissionsData.email,
                gambar: newMissionsData.nomor_telepon,
                logo: newMissionData.tanggal_lahir,
                duration: newMissionData.jenis_kelamin
            }
        });
        return mission;
    } catch (error) {
        console.error(error);
        throw new Error("Gagal membuat mission");
    }
}


const deleteMission = async(id) => {
    await prisma.mission.delete({
        where: {
            id,
        },
    });
}

const ubdateMission = async(id, missionData) => {
    const mission = await prisma.mission.update({
        where: {
            id: parseInt(id),
        },
        data: {
            title: missionsData.nama_lengkap,
            description: missionsData.alamat,
            point: missionsData.email,
            gambar: missionsData.nomor_telepon,
            logo: missionData.tanggal_lahir,
            duration: missionData.jenis_kelamin
        },
    });
    return mission
}

module.exports = {
    findMissions,
    findMissionsById,
    insertMission,
    deleteMission,
    ubdateMission
}