from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app=Flask(__name__)

#=========Wrap the app in CORS(Cross origin Request) to prevent the CORS Error===

CORS(app)

#===Creating a file that will act as a databse===#
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///mydatabase.dp"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False

db=SQLAlchemy(app)
