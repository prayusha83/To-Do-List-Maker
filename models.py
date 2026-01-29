from pydantic import BaseModel
# basemodel tells fastAPI that this is structured data

class Task(BaseModel):
    id: int | None = None  # id can be int or none (int|None)
    title: str
    completed: bool = False
