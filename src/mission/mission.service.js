const prisma = require("../db")
const { findMissions, findMissionsById, insertMission, deleteMission, ubdateMission } = require("./mission.repository")

const getAllMissions = async () => {
    const missions = await findMissions()
    return missions
}

const getMissionById = async (id) => {
    try {
        const mission = await findMissionsById(id)
        return mission
    } catch (err) {
        console.error(err);
        throw new Error("Internal server error")
    }
}

const createMission = async (newMissionsData) => {
    try {
        const mission = await insertMission(newMissionsData)
        return mission
    } catch (error) {
        throw error
    }
}

const deleteMissionById = async (id) => {

    
    try {
        const mission = await getMissionById(id)
        
        if (!mission) {
            throw Error("Mission not found")
        }; await deleteMission(id)
        return mission
    } catch (err) {
        console.error(err);
        throw Error("Internal server error")

    }
}

const ubdateMissionById = async (id, missionData) =>{
    await getMissionById(id)
    try {
        const mission = await ubdateMission(id, missionData)
        return mission
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getAllMissions,
    getMissionById,
    createMission,
    deleteMissionById,
    ubdateMissionById
}
