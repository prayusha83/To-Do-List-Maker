from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import database
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Serve static files (CSS, JS)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
def home():
    with open("templates/index.html", "r", encoding="utf-8") as f:
        return f.read()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

database.create_table()


class Task(BaseModel):
    title: str
    completed: bool = False


@app.get("/tasks")
def read_tasks():
    return database.get_tasks()


@app.post("/tasks")
def create_task(task: Task):
    database.add_task(task.title)
    return {"message": "Task added"}

@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: Task):
    database.update_task(task_id, task.title, task.completed)
    return {"message": "Task updated"}


@app.delete("/tasks/{task_id}")
def remove_task(task_id: int):
    database.delete_task(task_id)
    return {"message": "Task deleted"}
