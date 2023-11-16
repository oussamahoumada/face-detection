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
    'mail' : fields.String,
    'discount' : fields.String,
    'Satisfaction' : fields.String,
    'dateNaissance' : fields.String,
})

upload_model = api.model('Upload', {
    'message': fields.String, 
    'filename': fields.String
})
upload_input_model = api.model('Upload_input', {
    'file': fields.Raw,
    'fileName' : fields.String,
})