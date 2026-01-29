print("WELCOME")
while(1):
    print("Enter number as per your need")
    print("1) Add a new task")
    print("2) View existing tasks")
    print("3) Mark a task as done")
    print("4) Delete a task")
    print("5) Edit a task")
    print("6) Exit the program")

    choice=int(input())

    match choice:
        case 1:
            task=input(("Enter your task "))
            file= open("todo.txt", "a")
            file.write(f"[ ] {task}\n")
            file.close()
            print("Task added sucbcessfully")


        case 2:
            file=open("todo.txt", "r") 
            history=file.readlines() #reads one by one line, as a list of strings
            for i in range(len(history)):
                print(f"{i+1}) {history[i]}")
            file.close()


        case 3:
            print("This is your tasks history")

            file=open("todo.txt", "r")
            history=file.readlines()
            file.close()
            for i in range(len(history)):
                print(f"{i+1}) {history[i]}")

            done=int(input(("Enter which task number to be marked as done ")))
            if history[done-1].startswith("[ ]"):
                history[done-1]=history[done-1].replace("[ ]", "[x]")
                print("Marked as done")

                file=open("todo.txt", "w")
                file.writelines(history)
                file.close()
            else:
                print("It is already marked as done")


        case 4:
            print("These are your tasks ")
            file=open("todo.txt", "r")
            history=file.readlines()
            file.close()
            
            for i in range(len(history)):
                print(f"{i+1}) {history[i]}")

            remove=int(input("Enter the task number that you'd like to remove "))
            if remove>(len(history)):
                print("Enter a valid number ")
            else:
                history.pop(remove-1)
                file=open("todo.txt", "w")
                file.writelines(history)
                file.close()
                print("Task successfully deleted ")


        case 5:
            print("This is your tasks ")
            file=open("todo.txt", "r")
            history=file.readlines()
            file.close()
            
            for i in range(len(history)):
                print(f"{i+1}) {history[i]}")

            edit=int(input("Enter the task number that you'd like to edit "))
            if edit>(len(history)):
                print("Enter a valid number ")

            else:
                new=input("Enter what you'd like to replace it with ")
                #let status be [ ] or [x]
                oldtask=history[edit-1]
                status=oldtask[:3]  #012 samma hunxa 
                history[edit-1]=f"{status} {new}\n"
                file=open("todo.txt", "w")
                file.writelines(history)
                file.close()
                print("Edit successful")



        case 6:
            print("Exiting program")
            break


        case _:
            print("Please enter a valid number")