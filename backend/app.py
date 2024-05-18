from flask import Flask,request,jsonify
from config import app,db
from models import User,tasks

#==============================START APIs for the users table====================================
@app.route('/users/',methods=['GET'])
def get_users():
    users=User.query.all()
    print(f"users are {users}")
    json_users=list(map(lambda singleUser:singleUser.to_json(),users))
    return jsonify({"users":json_users})

@app.route('/create_user/',methods=['POST'])
def create_user():
    user_name=request.json.get("userName")
    email=request.json.get("email")
    password=request.json.get("password")

    if not user_name or not email or not password:
        return jsonify({"message":"You must include a user name, email and password"}),400
    
    new_user=User(user_name=user_name,email=email,password=password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e :
        return jsonify({"message": str(e)}),400
    
    return jsonify({"message":"User created successfully"}),201

@app.route('/sign_in/<int:id>',methods=["GET"])
def sign_in(id):
    email=request.json.get("email")
    password=request.json.get("password")

    if not email or not password:
         return jsonify({"message":"You must inlude an email and a password"}),400
    #==Get user from the database==
    user=User.query.get(id)

    if not user:
         return jsonify({"message":"User not found"}),404
    
    if user.password==password:
        return jsonify({"message":"Success.Password for the user is correct"}),200
    
#==============================END APIs for the users table====================================

    

#========================START APIs for the tasks table======================================

@app.route('/tasks/',methods=['GET'])
def get_tasks():
    all_tasks=tasks.query.all()
    print(f"taks are {all_tasks}")
    json_tasks=list(map(lambda singleTask:singleTask.to_json(),all_tasks))
    return jsonify({"tasks":json_tasks})

@app.route('/create_task/',methods=['POST'])
def create_task():
    user_id=request.json.get("userId")
    title=request.json.get("title")
    description=request.json.get("description")

    if not user_id or not title :
        return jsonify({"message":"You must inlude a userId and title"}),400
    if not description:
        description=''
    
    new_task=tasks(user_id=user_id,title=title,description=description)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e :
        return jsonify({"message": str(e)}),400
    
    return jsonify({"message":"Task created successfully"}),201

@app.route('/update_task/<int:id>',methods=['PATCH'])
def update_task(id):
    task=tasks.query.get(id)

    if not task:
        return jsonify({"message":"Task not found"}),404
    
    data=request.json
    #==We get the column data we want from the json received and update our DB.If not we persist the old data==
    task.title=data.get("title",task.title)
    task.description=data.get("description",task.description)

    db.session.commit()

    return jsonify({"message":"Task updated"}),200

@app.route('/delete_task/<int:id>',methods=['DELETE'])
def delete_task(id):
    task=tasks.query.get(id)

    if not task:
        return jsonify({"message":"Task not found"}),404
    
    db.session.delete(task)
    db.session.commit()

    return jsonify({"message":"Task deleted"}),200


#========================END APIs for the tasks table======================================

  
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5000, debug=True)









