# 🟣 Task Nest

A clean, Pinterest-inspired **full-stack to-do application** built with **Vanilla JavaScript + FastAPI + SQLite**.

Task Nest was developed step-by-step to deeply understand how frontend and backend systems communicate without using frameworks or generators.

---

## ✨ Features

- Add, edit, delete tasks
- Mark tasks as completed
- Persistent storage with SQLite
- RESTful API built using FastAPI
- Input validation & error handling
- Clean UI with a soft purple theme

---

## 🧠 Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend
- Python
- FastAPI
- Pydantic

### Database
- SQLite

---

## 🔌 API Endpoints

| Method | Route | Description |
|------|------|-------------|
| GET | `/tasks` | Fetch all tasks |
| POST | `/tasks` | Add a new task |
| PUT | `/tasks/{id}` | Update task (toggle/edit) |
| DELETE | `/tasks/{id}` | Delete a task |

---

## 🚀 Running Locally

### 1. Install dependencies
pip install fastapi uvicorn
### Run the server
uvicorn main:app --reload
### Open in browser
http://127.0.0.1:8000
