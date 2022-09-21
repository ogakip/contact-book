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

const invalidCreateUserData2 = {
    email: "ogaki2@gmail.com",
    password: "ABC123!-"
}

const invalidCreateUserData3 = {
    email: "ogaki2",
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

const invalidLoginUserData2: iLoginUser = {
    email: "paulo@gmail.com",
    password: "Abacate123!-"
}

describe("User creation test", () => {
    test("Testing user creation with valid information", async () => {
        const response = await request(app).post("/user/register").send(validCreateUserData);
    
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).not.toHaveProperty("password");
      });

    test("Testing user creation with invalid information", async () => {
        const response = await request(app).post("/user/register").send(invalidCreateUserData);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Name is required on body request");
    });

    test("Testing creation of already registered user", async () => {
        const response = await request(app).post("/user/register").send(validCreateUserData);
    
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("User already exists");
    });

    test("Testing user creation with invalid email", async () => {
        const response = await request(app).post("/user/register").send(invalidCreateUserData3);
    
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("E-mail format invalid");
    });

    test("Testing user creation with invalid password", async () => {
        const response = await request(app).post("/user/register").send(invalidCreateUserData2);
    
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Your password must contain at least one lowercase letter");
    });
});

describe("User login test", () => {
    test("Testing a valid user login", async () => {
        const response = await request(app).post("/user/login").send(validLoginUserData);
    
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("accessToken");
    });

    test("Testing login with invalid information", async () => {
        const response = await request(app).post("/user/login").send(invalidLoginUserData);
    
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("E-mail or password don't match");
    });

    test("Testing login from a non-existing user", async () => {
        const response = await request(app).post("/user/login").send(invalidLoginUserData2);
    
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("User not found");
    });
})