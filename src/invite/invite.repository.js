const prisma = require('../db');

const findInvites = async() => {
    const invites = await prisma.invite.findMany()
    return invites
}

const findInvitesById = async(id) => {
    const invites = await prisma.invite.findUnique({
        where: {
            id,
        }
    })
    return invites
}

const insertInvite = async(newInvitesData) => {
    try {
        const invite = await prisma.invite.create({
            data: {
                nama_sender: newInvitesData.nama_sender,
                nama_receiver: newInvitesData.nama_receiver,
                kode_sender: newInvitesData.kode_sender,
                kode_receiver: newInvitesData.kode_receiver,
                status: newInvitesData.status,
                tanggal_bergabung: new Date(),
            }
        });
        return invite;
    } catch (error) {
        console.error(error);
        throw new Error("Gagal membuat invite");
    }
}


const deleteInvite = async(id) => {
    await prisma.invite.delete({
        where: {
            id,
        },
    });
}

const ubdateInvite = async(id, inviteData) => {
    const invite = await prisma.invite.update({
        where: {
            id: parseInt(id),
        },
        data: {
            nama_sender: inviteData.nama_sender,
            nama_receiver: inviteData.nama_receiver,
            kode_sender: inviteData.kode_sender,
            kode_receiver: inviteData.kode_receiver,
            status: inviteData.status,
            tanggal_bergabung: new Date(),


        },
    });
    return invite
}

module.exports = {
    findInvites,
    findInvitesById,
    insertInvite,
    deleteInvite,
    ubdateInvite
}