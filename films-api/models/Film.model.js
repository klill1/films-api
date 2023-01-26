module.exports = (sequelize, Sequelize) => {
    const Film = sequelize.define("film", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filmName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Film
}
