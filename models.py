from pydantic import BaseModel
# basemodel tells fastAPI that this is structured data


# Pydantic models because normal Python classes cannot automatically validate and convert JSON request bodies into typed Python objects, nor generate API schemas. Pydantic handles parsing, validation, and documentation
class Task(BaseModel):
    id: int | None = None  # id can be int or none (int|None)
    title: str
    completed: bool = False
