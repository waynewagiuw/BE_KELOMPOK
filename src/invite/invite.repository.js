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
                nama_sender: newInvitesData.nama_lengkap,
                nama_receiver: newInvitesData.alamat,
                kode_sender: newInvitesData.email,
                kode_receiver: newInvitesData.nomor_telepon,
                status: newInviteData.tanggal_lahir,
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
            nama_sender: invitesData.nama_lengkap,
            nama_receiver: invitesData.alamat,
            kode_sender: invitesData.email,
            kode_receiver: inviteData.nomor_telepon,
            status: inviteData.tanggal_lahir,
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