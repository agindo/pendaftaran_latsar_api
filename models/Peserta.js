const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const pesertaSchema = new Schema({
    program_diklat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProgramDiklat'
    },
    kuota: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KuotaPeserta'
    },
    angkatan: {
        type: String
    },
    nip: {
        type: String
    },
    nama_lengkap: {
        type: String
    },
    tanggal_lahir: {
        type: String
    },
    tempat_lahir: {
        type: String
    },
    jenis_kelamin: {
        type: String
    },
    agama: {
        type: String
    },
    instansi: {
        type: String
    },
    jabatan: {
        type: String
    },
    pangkat_golongan: {
        type: String
    },
    no_hp: {
        type: String
    },
    email: {
        type: String
    },
    alamat: {
        type: String
    },
    kebutuhan_khusus: {
        type: String
    },
    kebutuhan_khusus_1: {
        type: String
    },
    berapa_minggu: {
        type: String
    },
    ukuran_baju: {
        type: String
    },
    ukuran_celana: {
        type: String
    },
    ukuran_sepatu: {
        type: String
    },
    nip_mentor: {
        type: String
    },
    nama_mentor: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    status: {
        type: Boolean
    }
},  { timestamps: true });

const Peserta = mongoose.model('Peserta', pesertaSchema, 'peserta');

module.exports = Peserta;