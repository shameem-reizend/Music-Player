import app from "./app"
import { AppDataSource } from "./config/data-source"

AppDataSource.initialize()
.then(() => {
    app.listen(3000, () => {
        console.log("Database connection successful")
        console.log(`The port is running on http://localhost:3000`)
    })
})
.catch(() => {
    console.log("Database Conncetion Failed!")
})