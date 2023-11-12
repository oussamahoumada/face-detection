from ..extensions import api
from flask_restx import fields

client_model = api.model("client",{
    'name': fields.Integer,
    'image' : fields.String,
    'dateNaissance' : fields.String,
    'mail' : fields.String,
})