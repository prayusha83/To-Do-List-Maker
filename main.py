from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import database  # means database.py
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
    if not task.title.strip():
        raise HTTPException(
            status_code=400,
            detail="Task title cannot be empty"
        )

    database.add_task(task.title.strip())
    return {"message": "Task added successfully"}

@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: Task):
    if not task.title.strip():
        raise HTTPException(status_code=400, detail="Task cannot be empty")

    success = database.update_task(
        task_id,
        task.title.strip(),
        task.completed
    )

    if not success:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task updated"}



@app.delete("/tasks/{task_id}")
def remove_task(task_id: int):
    success = database.delete_task(task_id)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return {"message": "Task deleted"}
