# 📌 ReactJS Booking Platform

A full-stack **Booking Platform** built with **React.js** on the frontend and the **SoftUni Practice Server** *(non-persistent)* for the backend.  
This project demonstrates my skills in **CRUD operations**, **authentication**, **route guards**, **React Context API**, and **custom hooks**.  
It was developed as part of my learning journey to strengthen my React knowledge.

---

## 📚 About This Project

This project helped me practice:

- Structuring a React application with a separate backend
- Implementing authentication and route protection
- Managing global state with Context API
- Creating reusable logic with custom hooks
- Working with CRUD APIs in React

---

## ✨ Features

- 🛠 **CRUD Operations** – Create, Read, Update, Delete bookings
- 🔐 **Basic Authentication** – using `localStorage` for login persistence
- 🚪 **Route Guards** – protect private routes from unauthorized access
- 🌐 **React Context API** – for managing global application state
- ♻ **Custom Hooks** – reusable logic for cleaner components
- 🖥 **SoftUni Practice Server** – lightweight, non-persistent backend for training

---

## 🛠 Tech Stack

**Frontend (Client)**  
- ⚛ React.js  
- 🧭 React Router  
- 🌐 Context API  
- 💾 LocalStorage  
- 🪝 Custom Hooks  

**Backend (Server)**  
- 🗄 **SoftUni Practice Server (Node)** *(non-persistent, data resets when server restarts)*

---

## 📂 Project Structure

├── client/ # React frontend 

├── server/ # SoftUni Practice Server backend


## How to run
- clone the repo

---

- Server: 
    - cd ./server (go to server dir)
    - node server (execute the command in terminal)
---
- Client:

    - cd client
    - npm install

    ---
    
    - npm run dev (this runs the project for development mode)


## 🔑 Usage

- Open the frontend in your browser — usually at **`http://localhost:5173`**
- Register or log in to access private routes
- Manage bookings (create, edit, delete)
- Test route guards by trying to open private pages without logging in

---


## ⚠ Note on Data Persistence

The **SoftUni Practice Server** is **non-persistent** —  
all data will reset when the server restarts.  
This is intentional for learning purposes.
