const filmsController = require("../controllers/FilmsController")
const usersController = require("../controllers/UsersController")
const filmUsersController = require("../controllers/FilmUsersController")

module.exports = (app) => {
    app.route("/films")
        .get(filmsController.getAll)
        .post(filmsController.createNew)

    app.route("/films/:id")
        .get(filmsController.getById)
        .delete(filmsController.deleteById)     
        .put(filmsController.updateById)
    
    app.route("/users")
        .get(usersController.getAll)
        .post(usersController.createNew)
    
    app.route("/users/:id")
        .get(usersController.getById)
        .delete(usersController.deleteById)
        .put(usersController.updateById)

    app.route("/filmUsers")
        .get(filmUsersController.getAll)
    
} 
  