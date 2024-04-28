const prisma = require("../db")
const { findHistorys, findHistorysById, insertHistory, deleteHistory, ubdateHistory } = require("./history.repository")

const getAllHistorys = async () => {
    const historys = await findHistorys()
    return historys
}

const getHistoryById = async (id) => {
    try {
        const history = await findHistorysById(id)
        return history
    } catch (err) {
        console.error(err);
        throw new Error("Internal server error")
    }
}

const createHistory = async (newHistorysData) => {
    try {
        const history = await insertHistory(newHistorysData)
        return history
    } catch (error) {
        throw error
    }
}

const deleteHistoryById = async (id) => {

    
    try {
        const history = await getHistoryById(id)
        
        if (!history) {
            throw Error("History not found")
        }; await deleteHistory(id)
        return history
    } catch (err) {
        console.error(err);
        throw Error("Internal server error")

    }
}

const ubdateHistoryById = async (id, historyData) =>{
    await getHistoryById(id)
    try {
        const history = await ubdateHistory(id, historyData)
        return history
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getAllHistorys,
    getHistoryById,
    createHistory,
    deleteHistoryById,
    ubdateHistoryById
}
