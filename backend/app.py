from flask import Flask,request
from markupsafe import escape

app=Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello world'

@app.route("/user/<username>", methods=['GET','POST'])
def user(username:str):
    if request.method=='GET':
         return f'Your name is {escape(username)} '
    
if __name__ == '__main__':
    app.run(port=5000, debug=True)









