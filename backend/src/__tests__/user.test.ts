import { DataSource } from "typeorm";
import { appDataSource } from "../data-source";
import { app } from "../app";
import request from "supertest";
import { iCreateUserTest, iLoginUserTest } from "../interfaces/user/tests";

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

const validCreateUserData: iCreateUserTest = {
    name: "Ogaki",
    email: "ogaki@gmail.com",
    password: "Abc123!-"
}

const validCreateUserData2: iCreateUserTest = {
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

const validLoginUserData: iLoginUserTest = {
    email: "ogaki@gmail.com",
    password: "Abc123!-"
}

const invalidLoginUserData: iLoginUserTest = {
    email: "ogaki@gmail.com",
    password: "Abacate123!-"
}

const invalidLoginUserData2: iLoginUserTest = {
    email: "paulo@gmail.com",
    password: "Abacate123!-"
}

const validUpdateUserData = {
    email: "atualizado@gmail.com"
}

describe("User creation test", () => {
    test("Testing user creation with valid information", async () => {
        const response = await request(app).post("/user/register").send(validCreateUserData);
    
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).not.toHaveProperty("password");
        validCreateUserData.id = response.body.id
      });

    test("Testing user creation with invalid information", async () => {
        const response = await request(app).post("/user/register").send(invalidCreateUserData);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Name is required on body request");
    });

    test("Testing creation of already registered user", async () => {
        const response = await request(app).post("/user/register").send(validCreateUserData2);
    
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
        validLoginUserData.accessToken = response.body.accessToken;
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

describe("User update test", () => {
    test("Updating an Authenticated User", async () => {
        const response = await request(app).patch("/user/").send(validUpdateUserData).set("Authorization", `Bearer ${validLoginUserData.accessToken}`)

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toEqual(validCreateUserData.id);
    })

    test("Updating an unauthenticated user", async () => {
        const response = await request(app).patch("/user/").send(validUpdateUserData).set("Authorization", `Bearer idonthavetoken`)

        expect(response.status).toEqual(401);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Invalid authorization access token");
    })
})

describe("User delete test", () => {
    test("Deleting an authenticated user", async () => {
        const response = await request(app).delete("/user/").send().set("Authorization", `Bearer ${validLoginUserData.accessToken}`)

        expect(response.status).toEqual(204);
    })

    test("Deleting an unauthenticated user", async () => {
        const response = await request(app).delete("/user/").send().set("Authorization", `Bearer idonthavetoken`)

        expect(response.status).toEqual(401);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Invalid authorization access token");
    })
})