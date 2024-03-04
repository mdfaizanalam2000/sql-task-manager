import pymssql
import os
from dotenv import load_dotenv

load_dotenv()

class Server:
    server = os.environ.get("SERVER")
    database = os.environ.get("DATABASE")
    username = os.environ.get("USER")
    password = os.environ.get("PASSWORD")

    # METHOD TO CONNECT TO SQL SERVER
    def connect_to_server(self):
        try:
            cnxn=pymssql.connect(self.server,self.username,self.password,self.database,autocommit=True)
            self.cursor = cnxn.cursor()
            print("Connection to database is successful!")
        except Exception as e:
            print(e)
            print("Problem while connecting to database!")
        # finally:
        #     self.cursor.close()
        #     print("closed")
        
    # METHODS TO PERFORM CRUD OPERATIONS ON TASKS
    def addTask(self,task):
        try:
            # self.connect_to_server()
            query=f"insert into task_manager values ({task['task_id']},{task['user_id']},'{task['title']}','{task['description']}','{task['due_date']}','{task['status']}')"
            
            self.cursor.execute(query)
            return {"message":"success"}
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")
        
    # def getAllTasks(self):
    #     try:
    #         # self.connect_to_server()
    #         query="select * from task_manager"

    #         self.cursor.execute(query)
    #         tasks=self.cursor.fetchall()
    #         cname= [column[0] for column in self.cursor.description]
    #         result=[dict(zip(cname,result)) for result in tasks]
    #         return result
    #     except Exception as e:
    #         return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")
        
    def getTaskByID(self,task_id):
        try:
            # self.connect_to_server()
            query=f"select * from task_manager where task_id={task_id}"

            self.cursor.execute(query)
            data=self.cursor.fetchone()
            cname= [column[0] for column in self.cursor.description]
            result=[dict(zip(cname,data))]
            return result
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")
        
    def updateTaskByID(self,task_id,updated_task):
        try:     
            # self.connect_to_server()     
            query=f"update task_manager set title='{updated_task['title']}',description='{updated_task['description']}',due_date='{updated_task['due_date']}',status='{updated_task['status']}' where task_id={task_id}"

            self.cursor.execute(query)
            return {"message":"success"}
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")
        
    def deleteTaskByID(self,task_id):
        try:
            # self.connect_to_server()
            query=f"delete from task_manager where task_id={task_id}"

            self.cursor.execute(query)
            return {"message":"success"}
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")
        
    # METHODS TO PERFORM CRUD OPERATIONS ON USERS
    def addUser(self,user):
        try:
            # self.connect_to_server()
            query=f"insert into user_data values({user['userid']},'{user['name']}','{user['domain']}','{user['password']}')"
            
            self.cursor.execute(query)
            return {"message":"success"}
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")
        
    def getUserByID(self,user_id):
        try:
            # self.connect_to_server()
            query=f"select * from user_data where user_id={user_id}"

            self.cursor.execute(query)
            data=self.cursor.fetchone()
            cname= [column[0] for column in self.cursor.description]
            result=[dict(zip(cname,data))]
            return result
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")
        
    # def getAllUsers(self):
    #     try:
    #         # self.connect_to_server()
    #         query="select * from user_data"

    #         self.cursor.execute(query)
    #         users=self.cursor.fetchall()
    #         cname= [column[0] for column in self.cursor.description]
    #         result=[dict(zip(cname,result)) for result in users]
    #         return result
    #     except Exception as e:
    #         return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")
        
    def updateUserByID(self,user_id,updated_user):
        try:          
            # self.connect_to_server()
            query=f"update user_data set name='{updated_user['name']}',domain='{updated_user['domain']}' where user_id={user_id}"
            
            self.cursor.execute(query)
            return {"message":"success"}
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")

    def updateUserPasswordByID(self,user_id,updated_password):
        try:          
            # self.connect_to_server()
            query=f"update user_data set password='{updated_password['new_password']}' where user_id={user_id}"
            
            self.cursor.execute(query)
            return {"message":"success"}
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")

    def deleteUserByID(self,user_id):
        try:          
            # self.connect_to_server()
            query=f"delete from user_data where user_id={user_id}"

            self.cursor.execute(query)
            return {"message":"success"}
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")
        
    def getAllTasksByUserID(self,user_id):
        try:
            # self.connect_to_server()
            query=f"select * from task_manager t join user_data u on t.user_id=u.user_id where t.user_id={user_id}"
            
            self.cursor.execute(query)
            tasks=self.cursor.fetchall()
            cname= [column[0] for column in self.cursor.description]
            result=[dict(zip(cname,result)) for result in tasks]
            return {"tasks":result}
        except Exception as e:
            return {"message":str(e)}
        # finally:
        #     self.cursor.close()
        #     print("Connection closed securely!")