require("dotenv").config()
const app = require("express")()
const mariadb = require("mariadb")
const port = process.env.APP_PORT

app.get('/films', (req, res) => {
    res.send(["The Lord of the Rings", "The Hobbit"])
})

const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json")
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionlimit: 5
})

app.get("/Customers", async(req, res) =>{
    console.log("customers initiating");
    let connection;
    try {
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT * FROM Customers")
        console.log(rows)
        res.send(rows)        
    }catch(error) {
        throw error
    } finally {
        if (connection) return connection.end()
    }
})

app.listen(port,()=>{
    console.log(`Api up at: http://localhost:${port}`)
})
