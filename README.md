# DummyJSON CRUD

A friendly tool for CRUD operations with DummyJSON.

🔗 **Live demo:** [https://dummyjson-crud.onrender.com](https://dummyjson-crud.onrender.com)

---

## 🛠️ Built with

- **Node.js** with **Express** — server and static file serving
- **HTML & CSS** — frontend structure and styling
- **DummyJSON API** — external REST API used as data source

---

## 🎯 Objective

The goal of this app is to connect with the [DummyJSON API](https://dummyjson.com), use it as a data source, and interact with it through HTTP requests to perform full **CRUD operations** (Create, Read, Update, Delete).

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

All changes are **non-permanent**. Since the app does not directly modify DummyJSON's database, reloading the page will restore everything back to its original state.

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
