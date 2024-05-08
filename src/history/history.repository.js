const prisma = require("../db")

const findHistorys = async () => {
    const historys = await prisma.history.findMany()
    return historys
}

const findHistorysById = async (id) => {
    const historys = await prisma.history.findUnique({
        where:{
            id,
        }
    })
    return historys
}

const insertHistory = async (newHistorysData) => {
    try {
        const history = await prisma.history.create({
            data: {
                tanggal_transaksi: new Date(), 
                nama_produk: newHistorysData.nama_produk,
                jenis_produk: newHistorysData.jenis_produk,
                deskripsi: newHistorysData.deskripsi
              }
              
        });
        return history;
    } catch (error) {
        console.error(error);
        throw new Error("Gagal membuat produk");
    }
}


const deleteHistory = async (id) =>{
     await prisma.history.delete({
        where: {
            id,
        },
    });
}

const ubdateHistory = async (id, historyData) => {
    const history = await prisma.history.update({
        where: {
            id: parseInt(id),
        },
        data: {
            tanggal_transaksi: new Date(), 
            nama_produk: historyData.nama_produk,
            jenis_produk: historyData.jenis_produk,
            productId: parseInt(historyData.productId),
            deskripsi: historyData.deskripsi
          },
    });
    return history
}

module.exports={
    findHistorys,
    findHistorysById,
    insertHistory,
    deleteHistory,
    ubdateHistory
}