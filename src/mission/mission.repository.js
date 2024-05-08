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
                title: newMissionsData.title,
                description: newMissionsData.description,
                point: newMissionsData.point,
                gambar: newMissionsData.gambar,
                logo: newMissionsData.logo,
                duration: newMissionsData.duration
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
            title: missionData.title,
            description: missionData.description,
            point: parseFloat(missionData.point),
            gambar: missionData.gambar,
            logo: missionData.logo,
            duration: missionData.duration
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