const app = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/' });

const { userAuth, userLogin } = require("../repo/Auth");
const { postPeserta, deletePeserta, updatePeserta, getPeserta, getSelectPeserta, getPic, getSelectKuotaPeserta, getSelectProgramDiklatPeserta, getSelectAngkatanPeserta, updateAngkatanPeserta } = require("../repo/PesertaRepo");
const { getProgramDiklat, getSelectProgramDiklat } = require("../repo/ProgramDiklatRepo")
const { getKuotaPeserta, getKuotaPesertaDetail, postKuotaPeserta, deleteKuotaPeserta, getKuotaPesertaByPic } = require("../repo/KuotaPesertaRepo")
// const { postPersyaratan } = require("../repo/PersyaratanRepo");
const Persyaratan = require("../models/Persyaratan");

app.get("/profile", async (req, res) => {
    return res.json("Hello Wolrd");
})

app.post("/login", async (req, res) => {
    await userLogin(req.body, res);
})

app.post("/admin", async (req, res) => {
    await postPeserta(req.body, "role_admin",res);
})

app.post("/lemdik", userAuth, async (req, res) => {
    await postPeserta(req.body, "role_lemdik",res);
})

app.post("/users", userAuth, async (req, res) => {
    await postPeserta(req.body, "role_kld",res);
})

app.get("/users", userAuth, async (req, res) => {
    await getPic(res)
})

app.post("/peserta", userAuth, async (req, res) => {
    await postPeserta(req.body, "role_peserta", res);
})

app.get("/peserta", userAuth, async (req, res) => {
    await getPeserta(res)
})

app.get("/peserta_angkatan/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    await getSelectAngkatanPeserta(id, res)
})

app.get("/peserta/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    await getSelectPeserta(id, res)
})

app.put("/peserta/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    await updatePeserta(req.body, id, res);
})

app.put("/angkatan_peserta/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    await updateAngkatanPeserta(req.body, id, res);
})

app.delete("/peserta/:id", userAuth,async (req, res) => {
    const { id } = req.params;
    return await deletePeserta(id, res);
})

app.get("/program_diklat", userAuth, async (req, res) => {
    await getProgramDiklat(res)
})

app.get("/program_diklat/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    await getSelectProgramDiklat(id, res)
})

app.get("/lihatpeserta/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    await getSelectKuotaPeserta(id, res)
})

app.get("/programdiklatpeserta/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    await getSelectProgramDiklatPeserta(id, res)
})



app.get("/kuota_peserta", userAuth, async (req, res) => {
    await getKuotaPeserta(res)
})

app.get("/kuota_peserta/detail/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    await getKuotaPesertaDetail(id, res)
})

app.get("/alokasi/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    await getKuotaPesertaByPic(id, res)
})

app.post("/kuota_peserta", userAuth, async (req, res) => {
    await postKuotaPeserta(req.body, res);
})

app.delete("/kuota_peserta/:id", userAuth,async (req, res) => {
    const { id } = req.params;
    return await deleteKuotaPeserta(id, res);
})

// app.post("/persyaratan", upload.single('surat_tugas'), userAuth, async (req, res) => {
//     try {
//         const testDoc = new Persyaratan({ "surat_tugas": req.file.path });
//         await testDoc.save();
//         return res.status(201).json({
//             message: "successfully",
//             success: true
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "failed",
//             success: false
//         });
//     }
// })

module.exports = app;