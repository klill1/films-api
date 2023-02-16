const { db } = require("../db")
const User = db.users

exports.getAll = async (req, res) => {
    const users = await User.findAll({attributes:["userName"]})
    res.send(users)
}

exports.getById = async (req,res) => {
    const users = await User.findByPk(req.params.id)
    if (users === null) {
        res.status(404).send({error: "User not found"})
        return
    }
    res.send(users)
}

exports.createNew = async (req, res) => {
    let user
    try {
      user = await User.create(req.body)
    } catch (error) {
      if (error instanceof db.Sequelize.ValidationError) {
        res.status(400).send({"error":error.errors.map((item)=> item.message)})
      } else {
        console.log("UsersCreate: ",error)
        res.status(500).send({error:"Something went wrong on our side. Sorry :("})
      }
      return
    }
    res
      .status(201)
      .location(`${getBaseUrl(req)}/users/${user.id}`)
      .json(user)
}

exports.deleteById = async (req, res) => {
  let result
  try {
    result = await User.destroy({where: {id:req.params.id}})
  } catch (error) {
    console.log("UserDelete: ", error)
    res.status(500).send({error:"Something went wrong on our side. Sorry :("})
    return
  }
  if(result === 0){
    res.status(404).send({error: "User not found"})
    return
  }
  res.status(204).send()
}

exports.updateById = async (req, res) => {
    let result
    delete req.body.id
  try {
    result = await User.update(req.body, {where: {id:req.params.id}})
  } catch (error) {
    console.log("User: ", error)
    res.status(500).send({error:"Something went wrong on our side. Sorry :("})
    return
  }
  if(result === 0){
    res.status(404).send({error: "User not found"})
    return
  }
  res.status(200).send()
}


getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )

 }