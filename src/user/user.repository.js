const prisma = require('../db');

const findUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

const findUsersById = async (id) => {
    const users = await prisma.user.findUnique({
        where: {
            id,
        }
    })
    return users
}

const insertUser = async (newUsersData) => {
    try {
        const user = await prisma.user.create({
            data: {
                nama_lengkap: newUsersData.nama_lengkap,
                alamat: newUsersData.alamat,
                email: newUsersData.email,
                nomor_telepon: newUsersData.nomor_telepon,
            }
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Gagal membuat user");
    }
}


const deleteUser = async (id) => {
    await prisma.user.delete({
        where: {
            id,
        },
    });
}

const ubdateUser = async (id, userData) => {
    const user = await prisma.user.update({
        where: {
            id: parseInt(id),
        },
        data: {
            nama_lengkap: userData.nama_lengkap,
            alamat: userData.alamat,
            email: userData.email,
            nomor_telepon: userData.nomor_telepon,
        },
    });
    return user
}

module.exports = {
    findUsers,
    findUsersById,
    insertUser,
    deleteUser,
    ubdateUser
}