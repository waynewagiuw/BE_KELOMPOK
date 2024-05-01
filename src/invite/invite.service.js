const prisma = require("../db")
const { findInvites, findInvitesById, insertInvite, deleteInvite, ubdateInvite } = require("./invite.repository")

const getAllInvites = async() => {
    const invites = await findInvites()
    return invites
}

const getInviteById = async(id) => {
    try {
        const invite = await findInvitesById(id)
        return invite
    } catch (err) {
        console.error(err);
        throw new Error("Internal server error")
    }
}

const createInvite = async(newInvitesData) => {
    try {
        const invite = await insertInvite(newInvitesData)
        return invite
    } catch (error) {
        throw error
    }
}

const deleteInviteById = async(id) => {


    try {
        const invite = await getInviteById(id)

        if (!invite) {
            throw Error("Invite not found")
        };
        await deleteInvite(id)
        return invite
    } catch (err) {
        console.error(err);
        throw Error("Internal server error")

    }
}

const ubdateInviteById = async(id, inviteData) => {
    await getInviteById(id)
    try {
        const invite = await ubdateInvite(id, inviteData)
        return invite
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getAllInvites,
    getInviteById,
    createInvite,
    deleteInviteById,
    ubdateInviteById
}