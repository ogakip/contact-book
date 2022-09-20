import express from "express"
import { UserRouter } from "./routes/user.routes"

export const app = express()
app.use(express.json())
app.use("/", UserRouter)