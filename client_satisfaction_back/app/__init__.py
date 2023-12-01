import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from .extensions import api,db
from .controllers.clientController import clientNs
from .controllers.recognitionController import recognitionNs

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = f"{os.getenv('db')}://{os.getenv('login')}:{os.getenv('password')}@{os.getenv('host')}:{os.getenv('port')}/{os.getenv('db_name')}"

    api.init_app(app)
    db.init_app(app)

    CORS(app)

    api.add_namespace(clientNs)
    api.add_namespace(recognitionNs)

    return app
