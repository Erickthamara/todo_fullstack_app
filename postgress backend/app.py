from flask import Flask,jsonify,request
import os
from dotenv import load_dotenv
from supabase import create_client
from flask_cors import CORS


# ============Reads the environment variables from .env into this file=====================
load_dotenv()
url=os.getenv("DATABASE_URL")
key=os.getenv("DATABASE_KEY")

# ==========Initiate th supabase client=================================
supabase=create_client(url,key)




app=Flask(__name__)
CORS(app)



#==============================START APIs for the users table====================================
@app.route('/api/users/',methods=['GET'])
def get_users():
    try:
        response = supabase.table("todo_Users").select("username").execute()
        # print(response)
        data=response.data
        # print(data)

    except Exception as e:
         print(f'Error is::{e}')

    return jsonify(data),200

@app.route('/api/create_user/',methods=['POST'])
def create_user():
    user_name=request.json.get("userName")
    email=request.json.get("email")
    password=request.json.get("password")

    if not user_name or not email or not password:
        return jsonify({"message":"You must include a user name, email and password"}),400
    
    try:
        data = supabase.table("todo_Users").insert({f"username":user_name,"email":email,"password":password}).execute()
        # Assert we pulled real data.
        assert len(data.data) > 0
    except Exception as e:
      print(f'Error is::{e}')
      return jsonify({"message":str(e)}),402

    return jsonify({"message":"User created successfully"}),201

  

@app.route('/api/sign_in/',methods=["POST"])
def sign_in():
    email=request.json.get("email")
    userPassword=request.json.get("password")

    if not email or not userPassword:
         return jsonify({"message":"You must inlude an email and a password"}),400
    #==Get user from the database==
    try:
        data = supabase.table("todo_Users").select("*").eq("email",email ).execute()

        # Assert we pulled real data.
        assert len(data.data) > 0
        user=data.data[0]
        # print(user)
        # print(user.get('password'))
        

    except Exception as e:
        print(f'Error:{e}')

    if not user:
         return jsonify({"message":"User not found.Wrong email entered"}),404
    
    # print(user[password])
    
    if user.get('password')==userPassword:
        return jsonify({
            "message":"Success.Password for the user is correct",
            "userId":user.get('id')
            }),200

    return jsonify({"message":"Wrong password."}),402
    
# #==============================END APIs for the users table====================================

    

# #========================START APIs for the tasks table======================================

@app.route('/api/tasks/<int:id>',methods=['GET'])
def get_tasks(id):
    try:
        response = supabase.table("tasks").select("*").eq('todo_UserId',id).execute()
        # print(response)
        json_tasks=response.data
        # print(json_tasks)
        # print(data)

    except Exception as e:
        print(f'Error is::{e}')
        return jsonify({"message":str(e)}),402

 
    return jsonify({"tasks":json_tasks}),200

@app.route('/api/create_task/',methods=['POST'])
def create_task():
    user_id=request.json.get("userId")
    title=request.json.get("title")
    complete=request.json.get("complete")
    description=request.json.get("description")

    if not user_id or not title :
        return jsonify({"message":"You must inlude a userId and title"}),400
    if not description:
        description=''
    print(f'complete is {complete}')
    
    try:
        data = supabase.table("tasks").insert({f"todo_UserId":user_id,"task_title":title,"task_description":description,"complete":complete}).execute()
        # Assert we pulled real data.
        assert len(data.data) > 0
    except Exception as e:
        print(f'Error is::{e}')
        return jsonify({"message":str(e)}),402
    
    return jsonify({"message":"Task created successfully"}),201

@app.route('/api/update_task/<int:id>',methods=['PATCH'])
def update_task(id):
    try:
        response = supabase.table("tasks").select("*").eq('id',id).execute()
        # print(response)
        task=response.data
        # print(json_tasks)
        # print(data)

    except Exception as e:
        print(f'Error is::{e}')
        return jsonify({"message":str(e)}),402

    if not task:
        return jsonify({"message":"Task not found"}),404
    print(task)
    
    data = supabase.table("tasks").update({"complete": not(task[0]['complete'])}).eq("id", id).execute()



    return jsonify({"message":"Task updated"}),200

@app.route('/api/delete_task/<int:id>',methods=['DELETE'])
def delete_task(id):
    try:
        response = supabase.table("tasks").select("*").eq('id',id).execute()
        # print(response)
        task=response.data
       
        # print(json_tasks)
        # print(data)

    except Exception as e:
        print(f'Error is::{e}')
        return jsonify({"message":str(e)}),402

    if not task:
        return jsonify({"message":"Task not found"}),404
    
    data = supabase.table("tasks").delete().eq("id", id).execute()
    
   

    return jsonify({"message":"Task deleted"}),200


#========================END APIs for the tasks table======================================


if __name__=='__main__':
    app.run(debug=True)




