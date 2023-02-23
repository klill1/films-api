module.exports = (sequelize, Sequelize) => {
    const Film = sequelize.define("film", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filmName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(4096)
        },
        releaseDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }


    })

    return Film
}
