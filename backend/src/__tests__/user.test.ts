import { DataSource } from "typeorm";
import { appDataSource } from "../data-source";
import { app } from "../app";
import request from "supertest";
import { iCreateUser, iLoginUser } from "../interfaces/user/index";

let connection: DataSource

beforeAll(async () => {
  await appDataSource.initialize()
    .then((res) => {
      connection = res;
    })
    .catch((err) => {
      console.error("Error during DataSource initialization", err);
    });
});

afterAll(async () => {
  await connection.destroy();
});

const validCreateUserData: iCreateUser = {
    name: "Ogaki",
    email: "ogaki@gmail.com",
    password: "Abc123!-"
}

const invalidCreateUserData = {
    email: "ogaki2@gmail.com",
    password: "Abc123!-"
}

const validLoginUserData: iLoginUser = {
    email: "ogaki@gmail.com",
    password: "Abc123!-"
}

const invalidLoginUserData: iLoginUser = {
    email: "ogaki@gmail.com",
    password: "Abacate123!-"
}

describe("User creation test", () => {
    test("Testing user creation with valid information", async () => {
        const response = await request(app).post("/user/register").send(validCreateUserData);
    
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).not.toHaveProperty("password");
      });
});