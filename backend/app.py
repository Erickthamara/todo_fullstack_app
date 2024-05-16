from flask import Flask,request,jsonify
from config import app,db
from models import User,tasks

# app=Flask(__name__)

# # @app.route('/')
# # def hello_world():
# #     return 'Hello world'

# # @app.route("/user/<username>", methods=['GET','POST'])
# # def user(username:str):
# #     if request.method=='GET':
# #          return f'Your name is {escape(username)} '

@app.route('/users/',methods=['GET'])
def get_users():
    users=User.query.all()
    print(f"users are {users}")
    json_users=list(map(lambda singleUser:singleUser.to_json(),users))
    return jsonify({"users":json_users})

# @app.route('/create_user/',methods=['POST'])
# def create_user():
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5000, debug=True)









