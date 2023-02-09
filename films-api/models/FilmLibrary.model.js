module.exports = (sequelize, Sequelize, Film, User) => {
    const FilmLibrary = sequelize.define("FilmLibrary", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        filmId: {
            type: Sequelize.INTEGER,
            references: {
                model: Film,
                key: "id",
            },
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        }
    })
    Film.belongsToMany(User, {through: FilmLibrary})
    User.belongsToMany(Film, {through: FilmLibrary})
    return FilmLibrary
}
