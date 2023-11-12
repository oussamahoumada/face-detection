from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import client
from ..models.client_api_model import client_model

clientNs = Namespace("API/")

@clientNs.route("/client")
class precise_adressAPI(Resource):
    @clientNs.marshal_list_with(client_model)
    def get(self):
        return client.query.all()