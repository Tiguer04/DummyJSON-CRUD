# DummyJSON CRUD
A friendly tool for CRUD operations with DummyJSON.

🔗 **Live demo:** [https://dummyjson-crud.onrender.com](https://dummyjson-crud.onrender.com)

---

## 🛠️ Built with

- **Node.js** with **Express** — server and static file serving
- **HTML & CSS** — frontend structure and styling
- **DummyJSON API** — external REST API used as data source
- **MySQL 8.0** — relational database for user management (Docker image locally, Aiven cloud in production)
- **JWT** — authentication via JSON Web Tokens
- **Bcrypt** — password hashing and verification
- **SweetAlert2** — user-friendly alert dialogs
- **Docker** — containerization of the backend and database

---

## 🎯 Objective

The goal of this app is to connect with the [DummyJSON API](https://dummyjson.com), use it as a data source, and interact with it through HTTP requests to perform full **CRUD operations** (Create, Read, Update, Delete) — all behind a secure authentication system built from scratch.

---

## 🔐 Authentication

Before accessing the main app, users must go through a register/login flow.

### Register
If the user doesn't have an account, they can click **"Don't have an account? Click here!"** on the login page and will be redirected to the register page, where they must fill in:

- **Username** — must be unique
- **Email** — must be unique and valid
- **Password** — must meet security requirements (uppercase, lowercase, number and special character)

If all validations pass, the user is registered and redirected to the login page. Passwords are **encrypted with Bcrypt** before being stored in the database.

### Login
On the login page, the user can enter their **email or username** along with their password. If the credentials match what's stored in the database, a **JWT is issued** and saved in the browser's session storage.

Every time the user tries to access the main page, the JWT is verified. If it's valid, access is granted — otherwise the user is redirected back to the login page.

All errors and validations are communicated to the user through **SweetAlert2** dialogs.

---

## 🚀 How to use it

### Adding a product
At the top of the page there is a form with three fields: name, price, and description. Fill them in and click **POST PRODUCT** to add a new product to the page. The following validations apply:

- All fields are required
- No duplicate product names are allowed

### Browsing products
Below the form, the page loads **30 products by default** from DummyJSON. At the bottom of the list there is a **"Watch more..."** button that loads 16 additional products each time it is clicked, until the API limit is reached.

### Editing a product
Each product card has an **Edit** button that opens an inline form allowing you to partially or fully update the product's information.

### Deleting a product
Each product card also has a **Delete** button. Clicking it will trigger a confirmation dialog to make sure the user is fully aware they are about to remove the product.

---

## ⚠️ Important note

All changes to products are **non-permanent**. Since the app does not directly modify DummyJSON's database, reloading the page will restore everything back to its original state. However, registered users **are permanently stored** in the database.

---

## 🐳 Docker

The entire application is containerized with Docker. The `docker-compose.yaml` file includes two services:

- **app** — the Node.js + Express backend
- **db** — a MySQL 8.0 database image

To run it locally you only need Docker installed — no need to set up MySQL separately.

In the deployed version on Render, the database is hosted on **Aiven** (cloud MySQL).

---

## 💻 Run it locally

```bash
# Clone the repository
git clone https://github.com/Tiguer04/DummyJSON-CRUD.git

# Install dependencies
cd dummyjson-crud
npm install

# Start the server
npm start
```

Then open your browser at `http://localhost:3000`.