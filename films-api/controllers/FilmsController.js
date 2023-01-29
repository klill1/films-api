const { db } = require("../db")
const Film = db.films

exports.getAll = async (req, res) => {
    const films = await Film.findAll({attributes:["filmName"]})
    res.send(films)
}
