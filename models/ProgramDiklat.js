const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const programDiklatSchema = new Schema({
    nama_program_diklat: {
        type: String
    },
    nama_angkatan: {
        type: String
    },
    jumlah_kelas: {
        type: Number
    },
    tahun_penyelenggara: {
        type: String
    },
    tanggal_mulai: {
        type: String
    },
    tanggal_selesai: {
        type: String
    },
    tanggal_deadline: {
        type: String
    },
    sumber_anggaran: {
        type: String
    },
    pola_anggaran: {
        type: String
    },
    jumlah_peserta: {
        type: Number
    }, 
    sisa_kuota: {
        type: Number
    },
    status: {
        type: Boolean
    }
});

const ProgramDiklat = mongoose.model('ProgramDiklat', programDiklatSchema, 'program_diklat');

module.exports = ProgramDiklat;
