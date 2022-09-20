import express from "express"
import "express-async-errors"
import { UserRouter } from "./routes/user.routes"
import { handleAppErrorMiddleware } from "./middlewares/handleAppError"

export const app = express()
app.use(express.json())
app.use("/user", UserRouter)
app.use(handleAppErrorMiddleware)