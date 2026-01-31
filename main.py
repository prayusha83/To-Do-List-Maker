from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import database

app = FastAPI()

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
