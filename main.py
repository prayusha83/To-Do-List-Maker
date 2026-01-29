from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import os
from fastapi.middleware.cors import CORSMiddleware
from models import Task

app = FastAPI()

# Mount static folder (for CSS/JS)
# app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"], #allow all for now
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Serve HTML file on home route
@app.get("/", response_class=HTMLResponse)
def home():
    with open("templates/index.html") as f:
        return f.read()
    

tasks = []
@app.get("/tasks")
def get_tasks():
    return tasks


@app.post("/tasks")
def add_tasks(task: Task):
    # task object of Task class
    task.id = len(tasks)+1
    tasks.append(task)
    return task