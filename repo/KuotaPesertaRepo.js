const KuotaPeserta = require("../models/KuotaPeserta");

const getKuotaPeserta = async (res) => {
    const doc = await KuotaPeserta.find();
    return res.json(doc);
}

const getKuotaPesertaDetail = async (id, res) => {
    const kuota = await KuotaPeserta.find({ "program_diklat": id }, { "tanggal": 1, "instansi": 1, "jumlah_peserta": 1, "status": 1 });
    return res.json(kuota);
}

const getKuotaPesertaByPic = async (id, res) => {
    const kuota = await KuotaPeserta.find({ "instansi": id }, { "tanggal": 1, "instansi": 1, "jumlah_peserta": 1, "status": 1, "program_diklat": 1 }).populate('program_diklat');
    return res.json(kuota);
}

const postKuotaPeserta = async (kuota_peserta, res) => {
    try {
        const kuotapeserta = new KuotaPeserta({ ...kuota_peserta });
        await kuotapeserta.save();
        return res.status(201).json({
            message: "successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "failed",
            success: false
        });
    }
}

const deleteKuotaPeserta = async (id, res) => {
    try {
        await KuotaPeserta.findByIdAndDelete(id)
        return res.status(201).json({
            message: "successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "failed",
            success: false
        });
    }
}

module.exports = { getKuotaPeserta, getKuotaPesertaDetail, postKuotaPeserta, deleteKuotaPeserta, getKuotaPesertaByPic }