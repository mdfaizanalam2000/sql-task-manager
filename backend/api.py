from server import Server
from fastapi import FastAPI,Body
from fastapi.middleware.cors import CORSMiddleware
import json

app=FastAPI()
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

server=Server()
server.connect_to_server()

# ------------API ROUTES FOR HANDLING TASKS----------

@app.post("/addTask")
def root(task=Body()):
   res=server.addTask(json.loads(task))
   return res

# @app.get("/getAllTasks")
# def root():
#     res=server.getAllTasks()
#     return res
    
@app.get("/getTask")
def root(task_id:int):
    res=server.getTaskByID(task_id)
    return res
   
@app.put("/updateTask")
def root(task_id:int,updated_task=Body()):
   res=server.updateTaskByID(task_id,json.loads(updated_task))
   return res
   
@app.delete("/deleteTask")
def root(task_id:int):
   res=server.deleteTaskByID(task_id)
   return res

# ---------------API ROUTES FOR HANDLING USERS---------------

@app.post("/addUser")
def root(user=Body()):
   res=server.addUser(json.loads(user))
   return res
   
@app.get("/getUser")
def root(user_id:int):
    res=server.getUserByID(user_id)
    return res
    
# @app.get("/getAllUsers")
# def root():
#     res=server.getAllUsers()
#     return res
    
@app.put("/updateUser")
def root(user_id:int,updated_user=Body()):
   res=server.updateUserByID(user_id,json.loads(updated_user))
   return res

@app.put("/updatePassword")
def root(user_id:int,updated_password=Body()):
   res=server.updateUserPasswordByID(user_id,json.loads(updated_password))
   return res

@app.delete("/deleteUser")
def root(user_id:int):
   res=server.deleteUserByID(user_id)
   return res
    
# API ROUTE TO FIND ALL TASKS OF A PARTICULAR USER
@app.get("/getAllTasksByUser")
def root(user_id:int):
    res=server.getAllTasksByUserID(user_id)
    return res