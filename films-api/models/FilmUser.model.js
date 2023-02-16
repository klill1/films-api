module.exports = (sequelize, Sequelize, Film, User) => {
    const FilmUser = sequelize.define("filmUser", {
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
    Film.belongsToMany(User, {through: FilmUser})
    User.belongsToMany(Film, {through: FilmUser})
    Film.hasMany(FilmUser)
    FilmUser.belongsTo(Film)
    User.hasMany(FilmUser)
    FilmUser.belongsTo(User)
    return FilmUser
}
