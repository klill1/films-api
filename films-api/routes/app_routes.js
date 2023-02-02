const filmsController = require("../controllers/FilmsController.js")

module.exports = (app) => {
    app.route("/films")
        .get(filmsController.getAll)
        .get(filmsController.createNew)
    //     .post(filmsController.createNew)        // Create
    app.route("/films/:id")
        .get(filmsController.getById)
    
    //     .get(filmsController.getById)           // Read
    //     .put(filmsController.updateById)        // Update
    //     .delete(filmsController.deleteById)     // Delete
}   