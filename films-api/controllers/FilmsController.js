const { db } = require("../db")
const Film = db.films

exports.getAll = async (req, res) => {
    const films = await Film.findAll({attributes:["id","filmName"]})
    res.send(films)
}

exports.getById = async (req,res) => {
    const films = await Film.findByPk(req.params.id)
    if (films === null) {
        res.status(404).send({error: "Film not found"})
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
        res.status(500).send({error:"Something went wrong on our side. Sorry :("})
      }
      return
    }
    res
      .status(201)
      .location(`${getBaseUrl(req)}/films/${film.id}`)
      .json(film)
}

exports.deleteById = async (req, res) => {
  let result
  try {
    result = await Film.destroy({where: {id:req.params.id}})
  } catch (error) {
    console.log("FilmDelete: ", error)
    res.status(500).send({error:"Something went wrong on our side. Sorry :("})
    return
  }
  if(result === 0){
    res.status(404).send({error: "Film not found"})
    return
  }
  res.status(204).send()
}

exports.updateById = async (req, res) => {
    let result
    delete req.body.id
  try {
    result = await Film.update(req.body, {where: {id:req.params.id}})
  } catch (error) {
    console.log("Film: ", error)
    res.status(500).send({error:"Something went wrong on our side. Sorry :("})
    return
  }
  if(result === 0){
    res.status(404).send({error: "Film not found"})
    return
  }
  const film = await Film.findByPk(req.params.id)
  res.status(200)
      .location(`${getBaseUrl(req)}/users/${film.id}`)
      .json(film)
}


getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )

 }



