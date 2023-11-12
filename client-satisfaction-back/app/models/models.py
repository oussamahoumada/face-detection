from ..extensions import db 

class client(db.Model):
    client_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    mail = db.Column(db.String(250))
    image = db.Column(db.String(250))
    dateNaissance = db.Column(db.String(250))


