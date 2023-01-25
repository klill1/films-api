require("dotenv").config()
const app = require("express")()
const port = process.env.APP_PORT

app.get('/films', (req, res) => {
    res.send(["The Lord of the Rings", "The Hobbit"])
})

const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json")
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port,()=>{
    console.log(`Api up at: http://localhost:${port}`)
})
