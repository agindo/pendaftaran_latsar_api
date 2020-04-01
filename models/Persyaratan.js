const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const persyaratanSchema = new Schema({
    peserta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Peserta'
    },
    surat_tugas: {
        type: String
    },
    sk_cpns: {
        type: String
    },
    skp: {
        type: String
    },
    surat_keterangan_sehat: {
        type: String
    },
    surat_pernyataan: {
        type: String
    },
    photo: {
        type: String
    },
    status: {
        type: Boolean
    }
},  { timestamps: true });

const Persyaratan = mongoose.model('Persyaratan', persyaratanSchema, 'persyaratan');

module.exports = Persyaratan;