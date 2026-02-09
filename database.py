import sqlite3
# import os
# print("DB PATH:", os.path.abspath("tasks.db"))

DB_NAME = "tasks.db"


def get_connection():
    return sqlite3.connect(DB_NAME)
# opens the db file, creates it if it doesnt exist. returns a connection object


def create_table():
    conn = get_connection()
    cursor = conn.cursor()
    # cursor is a sql command executor. it is used to run queries, fetch results

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER NOT NULL
        )
    """)

    conn.commit()
    # commit needed for insert/update/delete etc to actually work (kinda like confirming a task)
    conn.close()


def get_tasks():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, title, completed FROM tasks")
    rows = cursor.fetchall()
    # fetchall returns each row of the db, [(1,"study",0), (2,"sleep",0)]

    conn.close()

    tasks = []
    # convert to dictionary
    for row in rows:
        tasks.append({
            "id": row[0],
            "title": row[1],
            "completed": bool(row[2])
        })

    return tasks


def add_task(title):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO tasks (title, completed) VALUES (?, ?)",
        (title, 0)
    )

    conn.commit()
    conn.close()


def update_task(task_id, title, completed):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
        (title, int(completed), task_id)
    )

    affected = cursor.rowcount
    # 0 if task not found
    conn.commit()
    conn.close()

    return affected > 0 


def delete_task(task_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM tasks WHERE id = ?",
        (task_id,)
    )

    affected = cursor.rowcount
    conn.commit()
    conn.close()

    return affected > 0



# btw
# | SQL Keyword | Effect           |
# | ----------- | ---------------- |
# | SELECT      | Read             |
# | INSERT      | Add              |
# | UPDATE      | Modify           |
# | DELETE      | Remove           |
# | CREATE      | Create structure |
