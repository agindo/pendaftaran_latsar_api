const Persyaratan = require("../models/Persyaratan");

const postPersyaratan = async (req, res) => {
    try {
        const docs = new Persyaratan({ "surat_tugas": req.surat_tugas });
        await docs.save();
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

module.exports = { postPersyaratan }