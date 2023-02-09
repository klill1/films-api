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

exports.createNew = async (req, res) => {
    let film
    try {
      film = await Film.create(req.body)
    } catch (error) {
      if (error instanceof db.Sequelize.ValidationError) {
        res.status(400).send({"error":error.errors.map((item)=> item.message)})
      } else {
        console.log("FilmsCreate: ",error)
        res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
      }
      return
    }
    res
      .status(201)
      .location(`${getBaseUrl(req)}/films/${film.id}`)
      .json(film)
}


getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )

 }

