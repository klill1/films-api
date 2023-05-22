const { db } = require("../db")
const FilmUsers = db.filmUsers
const Film = db.films
const User = db.users
const QueryTypes = db.Sequelize.QueryTypes

exports.getAll = async (req, res) => {
    const sql = `SELECT GROUP_CONCAT(f.filmName SEPARATOR '; ') as "filmName",
                          u.userName as "userName"
                   FROM filmUsers AS fu 
                   INNER JOIN films AS f on f.id = fu.FilmId 
                   INNER JOIN users AS u on u.id = fu.UserId
                   GROUP BY fu.UserId;`
    const sqlResult = await db.sequelize.query(sql, { type: QueryTypes.SELECT })
    if (sqlResult.length === 0) {
      res.send({ error: "No films stored on users." })
      return
    }
    res.send(sqlResult)
  }