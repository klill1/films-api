const { db } = require("../db")
const Film = db.films

exports.getAll = async (req, res) => {
    const films = await Film.findAll({attributes:["filmName"]})
    res.send(films)
}

exports.getById = async (req,res) => {
    const films = await Film.findByPk(req.params.id)
    if (films === null) {
        res.status(404).send({"Error":"Film not found"})
        return
    }
    res.send(films)
}
