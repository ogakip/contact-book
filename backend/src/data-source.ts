import { DataSource } from "typeorm";
import "reflect-metadata";
require("dotenv").config();

const currentProcess = process.env.NODE_ENV;
const host = currentProcess === "migration" ? "localhost" : "contact_database";

export const appDataSource = currentProcess === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.ts"],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        host,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      });
