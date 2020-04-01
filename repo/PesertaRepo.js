const Peserta = require("../models/Peserta");
const bcrypt = require("bcryptjs");

const postPeserta = async (calon_peserta, role, res) => {
    try {
        
        // let namalengkapNotRegistered = await validateNamaLengkap(calon_peserta.nama_lengkap);
        // if (!namalengkapNotRegistered) {
        //     return res.status(400).json({
        //         message: `Nama Lengkap is already registered.`,
        //         success: false
        //     })
        // }

        const password = await bcrypt.hash(calon_peserta.password, 12);

        const peserta = new Peserta({ ...calon_peserta, password, role });
        await peserta.save();
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

const deletePeserta = async (id, res) => {
    try {
        await Peserta.findByIdAndDelete(id)
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

const updatePeserta = async (calon_peserta, id, res) => {
    try {
        // const password = await bcrypt.hash(calon_peserta.password, 12);
        const query = { _id: id }
        await Peserta.findOneAndUpdate(query, { $set: { ...calon_peserta }});
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

const updateAngkatanPeserta = async (calon_peserta, id, res) => {
    try {
        // const password = await bcrypt.hash(calon_peserta.password, 12);
        const query = { _id: id }
        await Peserta.findOneAndUpdate(query, { $set: { "angkatan": calon_peserta.angkatan }});
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

const getPeserta = async (res) => {
    const doc = await Peserta.find();
    return res.json(doc);
}

const getSelectPeserta = async (id, res) => {
    const peserta = await Peserta.findById({"_id": id});
    return res.json(peserta);
}

const getPic = async (res) => {
    const pic = await Peserta.find({ "role": "role_kld" }, { "nip": 1, "nama_lengkap": 1, "instansi": 1, "username": 1, "status": 1 });
    return res.json(pic);
}

const getSelectKuotaPeserta = async (id, res) => {
    const pic = await Peserta.find({ "kuota": id }, { "nip": 1, "nama_lengkap": 1, "instansi": 1, "username": 1, "status": 1 });
    return res.json(pic);
}

const getSelectProgramDiklatPeserta = async (id, res) => {
    const program = await Peserta.find({ "program_diklat": id }, { "nip": 1, "nama_lengkap": 1, "instansi": 1, "angkatan": 1, "username": 1, "jenis_kelamin": 1, "agama": 1, "status": 1 });
    return res.json(program);
}

const getSelectAngkatanPeserta = async (id, res) => {
    const angkatan = await Peserta.find({ "angkatan": id }, { "nip": 1, "nama_lengkap": 1, "instansi": 1, "angkatan": 1, "username": 1, "status": 1 });
    return res.json(angkatan);
}

const validateNamaLengkap = async nama_lengkap => {
    let name = await Peserta.findOne({ nama_lengkap });
    return name ? false : true;
}

module.exports = { postPeserta, deletePeserta, updatePeserta, getPeserta, getSelectPeserta, getPic, getSelectKuotaPeserta, getSelectProgramDiklatPeserta, getSelectAngkatanPeserta, updateAngkatanPeserta }