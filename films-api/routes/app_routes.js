const filmsController = require("../controllers/FilmsController.js")

module.exports = (app) => {
    app.route("/films")
        .get(filmsController.getAll)
        .post(filmsController.createNew)

    app.route("/films/:id")
        .get(filmsController.getById)
        .delete(filmsController.deleteById)     
        .put(filmsController.updateById)        
} 
  