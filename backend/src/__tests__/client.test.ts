import { DataSource } from "typeorm";
import { appDataSource } from "../data-source";
import { app } from "../app";
import request from "supertest";
import { iCreateUserTest, iLoginUserTest } from "../interfaces/user/tests";
import { iCreateClientData } from "../interfaces/client/tests";

let connection: DataSource

beforeAll(async () => {
  await appDataSource.initialize()
    .then((res) => {
      connection = res;
    })
    .catch((err) => {
      console.error("Error during DataSource initialization", err);
    });
    
    const user1 = await request(app).post("/user/register").send(validCreateUserData)
    const user2 = await request(app).post("/user/register").send(validCreateUserData2)
    validCreateUserData.id = user1.body.id;
    validCreateUserData2.id = user2.body.id;

    const login1 = await request(app).post("/user/login").send(validLoginUserData)
    const login2 = await request(app).post("/user/login").send(validLoginUserData2)
    validCreateUserData.accessToken = login1?.body?.accessToken
    validCreateUserData2.accessToken = login2?.body?.accessToken
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
    email: "ogaki2@gmail.com",
    password: "Abc123!-"
}

const validLoginUserData: iLoginUserTest = {
    email: "ogaki@gmail.com",
    password: "Abc123!-"
}

const validLoginUserData2: iLoginUserTest = {
    email: "ogaki2@gmail.com",
    password: "Abc123!-"
}

const validCreateClientData: iCreateClientData = {
    name: "client1",
    email: "client1@gmail.com",
    telephone: "(44)9999-9999"
}

const validCreateClientData2: iCreateClientData = {
    name: "client1",
    email: "client1@gmail.com",
    telephone: "(44)9999-9999"
}

const invalidCreateClientData = {
    email: "client1@gmail.com",
    telephone: "(44)9999-9999"
}

const validUpdateClientData = {
    email: "client1atualizado@gmail.com"
}

const invalidUpdateClientData = {
    email: "client1atualizado"
}

describe("Client creation test", () => {
    test("Creating a customer with valid information", async () => {
        const response = await request(app).post("/clients/").send(validCreateClientData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("id");
        validCreateClientData2.id = response.body.id
    })

    test("Creating a customer with invalid information", async () => {
        const response = await request(app).post("/clients/").send(invalidCreateClientData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Name is required on body request");
    })

    test("Creating a customer already registered by the user", async () => {
        const response = await request(app).post("/clients/").send(validCreateClientData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("You already have this client");
    })
})

describe("Updating a customer", () => {
    test("Updating a customer with valid information", async () => {
        const response = await request(app).patch(`/clients/${validCreateClientData2.id}`).send(validUpdateClientData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    })

    test("Updating a customer with valid information", async () => {
        const response = await request(app).patch(`/clients/${validCreateClientData2.id}`).send(invalidUpdateClientData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("E-mail format invalid");
    })
})

describe("Deleting a customer test", () => {
    test("Deleting a client with authorization", async () => {
        const response = await request(app).delete(`/clients/${validCreateClientData2.id}`).send().set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(204);
    })

    test("Deleting a client without authorization", async () => {
        const response = await request(app).delete(`/clients/${validCreateClientData2.id}`).send().set("Authorization", `Bearer naotemtoken`)
        expect(response.status).toEqual(401);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Invalid authorization access token");
    })
})