import { DataSource } from "typeorm";
import { appDataSource } from "../data-source";
import { app } from "../app";
import request from "supertest";
import { iCreateUserTest, iLoginUserTest } from "../interfaces/user/tests";
import { iCreateClientData } from "../interfaces/client/tests";
import { iCreateContactTest } from "../interfaces/contact/tests"

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

    const client1 = await request(app).post("/clients/").send(validCreateClientData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
    validCreateClientData.id = client1.body.id
    const client2 = await request(app).post("/clients/").send(validCreateClientData2).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
    validCreateClientData2.id = client2.body.id
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

const validCreateContactData: iCreateContactTest = {
    name: "client1",
    email: "client1@gmail.com",
    telephone: "(44)9999-9999"
}

const validCreateContactData2: iCreateContactTest = {
    name: "client1",
    email: "client1@gmail.com",
    telephone: "(44)9999-999"
}

const invalidCreateContactData = {
    name: "client1",
    email: "client1@gmail.com"
}

const validUpdateContactData = {
    email: "contact1@gmail.com"
}

const invalidUpdateContactData = {
    email: "contact1"
}

describe("Create contact tests", () => {
    test("Creating a contact with valid information", async () => {
        const response = await request(app).post(`/contacts/${validCreateClientData.id}`).send(validCreateContactData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("id");
        validCreateContactData.id = response.body.id
    })

    test("Creating a contact with invalid information", async () => {
        const response = await request(app).post(`/contacts/${validCreateClientData.id}`).send(invalidCreateContactData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Telephone is required on body request");
    })
})

describe("Update contact tests", () => {
    test("Updating a contact with valid information", async () => {
        const response = await request(app).patch(`/contacts/${validCreateContactData.id}`).send(validUpdateContactData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        console.log(response.body.error)
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    })

    test("Updating a contact with invalid information", async () => {
        const response = await request(app).patch(`/contacts/${validCreateContactData.id}`).send(invalidUpdateContactData).set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("E-mail format invalid");
    })
})

describe("Delete contact tests", () => {
    test("Deleting a contact with authorization", async () => {
        const response = await request(app).delete(`/contacts/${validCreateContactData.id}`).send().set("Authorization", `Bearer ${validCreateUserData.accessToken}`)
        expect(response.status).toEqual(204);
    })

    test("Deleting a contact without authorization", async () => {
        const response = await request(app).delete(`/contacts/${validCreateContactData.id}`).send().set("Authorization", `Bearer naotemtoken`)
        expect(response.status).toEqual(401);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Invalid authorization access token");
    })
})