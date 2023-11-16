from flask import Flask
from flask_cors import CORS

from .extensions import api,db
from .controllers.clientController import clientNs

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost:3306/client_satisfaction_db"
    CORS(app, resources={r"/API/*": {"origins": "*"}})

    api.init_app(app)
    db.init_app(app)

    api.add_namespace(clientNs)
    return app