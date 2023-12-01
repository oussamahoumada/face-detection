from ..extensions import api
from flask_restx import fields

client_model = api.model("client",{
    'client_id' : fields.Integer,
    'name': fields.String,
    'image' : fields.String,
    'mail' : fields.String,
    'discount' : fields.String,
    'Satisfaction' : fields.String,
    'dateNaissance' : fields.String,
})

client_input_model = api.model("client_input",{
    'name': fields.String,
    'image' : fields.String,
    'img_name' : fields.String,
    'mail' : fields.String,
    'discount' : fields.String,
    'Satisfaction' : fields.String,
    'dateNaissance' : fields.String,
})

client_delete_model = api.model("client_delete_input",{
    'ids' : fields.Raw(),
})