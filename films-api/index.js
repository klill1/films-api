require("dotenv").config()
const app = require("express")()
const port = process.env.APP_PORT

const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json")
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

require("./routes/app_routes")(app)

app.listen(port,()=>{
    console.log(`Api up at: http://localhost:${port}`)
})
