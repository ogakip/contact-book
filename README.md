# Contact-book
## This application has the purpose of managing clients and their contacts, with a clean and practical interface.

### Technologies used in this project:
 - Backend:
   - Node JS
   - TypeScript
   - Express
   - TypeORM
   - PostgreSQL
   - Yup
   - UUID
   - Bcrypt
   - Jsonwebtoken
   - Jest
   - Sqlite3
 - Frontend:
   - React JS
   - JavaScript
   - Axios
   - Styled-components
   - Material-Ui
   - React-icons
   - React-router-dom
   - React-hook-form
   - Yup
   - React-toastify

## Diagrams
![image](https://user-images.githubusercontent.com/95350195/192169180-46e2b585-ce00-4a02-bb4a-cdbe43ffc24b.png)

## Quick start

- To start this application first you need to have docker installed on your machine, to install it just follow the instructions through this link:
  - https://docs.docker.com/engine/install/
 
- After installation, install as exact needs within the /frontend and /backend masses with the ```yarn``` command for the correct execution of the project.

- Then, just run the ```docker compose up``` command in the repository's home folder to start the project execution.

- The graphical interface will be hosted on [Graphic interface](http://localhost:3000)

- You can access the api through [API access](http://localhost:8080)

## API Features and documentation

Base URL: http://localhost:8080
You can find the documentation here [documentation](https://api-book-docs.vercel.app/)

## Endpoints

| ENDPOINTS |  GET                 |  POST                |  PATCH                |  DELETE              |
|-----------|----------------------|----------------------|-----------------------|----------------------|
| USER      |       --             | /user/               | /user/                | /user/               |
| CLIENTS   | /clients/            | /clients/            | /clients/client_id    | /clients/client_id   |
| CONTACTS  | /contacts/client_id  | /contacts/client_id  | /contacts/contact_id  | /contacts/contact_id |
| LOGIN     |       --             | /user/               |
