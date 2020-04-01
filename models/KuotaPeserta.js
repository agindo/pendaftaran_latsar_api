const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const kuotaPesertaSchema = new Schema({
    tanggal: {
        type: String
    },
    instansi: {
        type: String
    },
    jumlah_peserta: {
        type: Number
    },
    program_diklat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProgramDiklat'
    },
    status: {
        type: Boolean
    }
});

const KuotaPeserta = mongoose.model('KuotaPeserta', kuotaPesertaSchema, 'kuota_peserta');

module.exports = KuotaPeserta;