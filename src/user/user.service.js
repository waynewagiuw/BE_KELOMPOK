const prisma = require("../db")
const { findUsers, findUsersById, insertUser, deleteUser, ubdateUser } = require("./user.repository")

const getAllUsers = async () => {
    const users = await findUsers()
    return users
}

const getUserById = async (id) => {
    try {
        const user = await findUsersById(id)
        return user
    } catch (err) {
        console.error(err);
        throw new Error("Internal server error")
    }
}

const createUser = async (newUsersData) => {
    try {
        const user = await insertUser(newUsersData)
        return user
    } catch (error) {
        throw error
    }
}

const deleteUserById = async (id) => {

    
    try {
        const user = await getUserById(id)
        
        if (!user) {
            throw Error("User not found")
        }; await deleteUser(id)
        return user
    } catch (err) {
        console.error(err);
        throw Error("Internal server error")

    }
}

const ubdateUserById = async (id, userData) =>{
    await getUserById(id)
    try {
        const user = await ubdateUser(id, userData)
        return user
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    ubdateUserById
}
