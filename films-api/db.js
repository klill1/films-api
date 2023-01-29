const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        }
    }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.films = require("./models/Film.model")(sequelize, Sequelize)

async function Sync() {
    await sequelize.sync({alter:true}) // alter existing table
    // {force:true} -- erase and recreate
}

module.exports = { db, Sync }
