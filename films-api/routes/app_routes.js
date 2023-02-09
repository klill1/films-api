const filmsController = require("../controllers/FilmsController.js")

module.exports = (app) => {
    app.route("/films")
        .get(filmsController.getAll)
        .post(filmsController.createNew)

    app.route("/films/:id")
        .get(filmsController.getById)
    
    //     .get(filmsController.getById)           // Read
    //     .put(filmsController.updateById)        // Update
    //     .delete(filmsController.deleteById)     // Delete
}   