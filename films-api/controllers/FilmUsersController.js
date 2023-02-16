const { db } = require("../db")
const FilmUsers = db.filmUsers
const Film = db.films

exports.getAll = async (req,res) => {
    const filmUsers = await FilmUsers.findAll({
        include: { all: true},
        logging: console.log
    })
    console.log(filmUsers);
    let result = []
    result = filmUsers.map((gp) => {
        return {
            "filmName": gp.Film.filmName,
            "userName": `${gp.user.userName}`
        }
    })
    res.send(result)
}
