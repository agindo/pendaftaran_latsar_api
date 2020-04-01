const ProgramDiklat = require("../models/ProgramDiklat");

const getProgramDiklat = async (res) => {
    const program = await ProgramDiklat.find();
    return res.json(program);
}

const getSelectProgramDiklat = async (id, res) => {
    const program = await ProgramDiklat.findById({"_id": id});
    return res.json(program);
}

module.exports = { getProgramDiklat, getSelectProgramDiklat }