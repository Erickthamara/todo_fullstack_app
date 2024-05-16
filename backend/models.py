from config import db

class User(db.Model):
    __tablename__='users'

    user_id=db.Column(db.Integer,primary_key=True)
    user_name=db.Column(db.String(100),unique=True,nullable=False)
    email=db.Column(db.String(100),unique=True,nullable=False)
    password=db.Column(db.String)

    def to_json(self):
        return {
            "id":self.user_id,
            "userName":self.user_name,
            "email":self.email,
            "passord":self.password
        }
    

class tasks(db.Model):
    __tablename__='tasks'

    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.user_id'),nullable=False)
    title=db.Column(db.String(100),nullable=False)
    description=db.Column(db.String(255))
   

    def to_json(self):
        return {
            "id":self.id,
            "userId":self.user_id,
            "title":self.title,
            "description":self.description
        }