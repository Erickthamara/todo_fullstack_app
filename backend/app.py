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

@app.route('/sign_in/',methods=["POST"])
def sign_in():
    email=request.json.get("email")
    password=request.json.get("password")

    if not email or not password:
         return jsonify({"message":"You must inlude an email and a password"}),400
    #==Get user from the database==
    # user=User.query.get()
    user=User.query.filter_by(email=email).first()

    if not user:
         return jsonify({"message":"User not found.Wrong email entered"}),404
    
    if user.password==password:
        return jsonify({
            "message":"Success.Password for the user is correct",
            "userId":user.user_id
            }),200

    return jsonify({"message":"Wrong password."}),402
    
#==============================END APIs for the users table====================================

    

#========================START APIs for the tasks table======================================

@app.route('/tasks/<int:id>',methods=['GET'])
def get_tasks(id):
    tasksList=tasks.query.filter_by(user_id=id).all()
    # tasksList=tasks.query.all()
    # print(f"task lis t is{tasksList}")

    
    # json_tasks = [task.to_json() for task in tasksList]
    json_tasks=list(map(lambda singletask:singletask.to_json(),tasksList))
    # print(f"list is {json_tasks}")
    return jsonify({"tasks":json_tasks}),200

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

# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#     return response
  
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5000, debug=True)









