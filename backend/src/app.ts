import express from "express"
import "express-async-errors"
import { UserRouter } from "./routes/user.routes"
import { ClientRoutes } from "./routes/client.routes"
import { handleAppErrorMiddleware } from "./middlewares/handleAppError"
import { ContactRoutes } from "./routes/contact.routes"

export const app = express()
app.use(express.json())
app.use("/user", UserRouter)
app.use("/clients", ClientRoutes)
app.use("/contacts", ContactRoutes)
app.use(handleAppErrorMiddleware)