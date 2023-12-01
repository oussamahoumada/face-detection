from ..extensions import api
from flask_restx import fields

upload_model = api.model('Upload', {
    'message': fields.String, 
    'filename': fields.String
})
upload_input_model = api.model('Upload_input', {
    'file': fields.Raw,
    'fileName' : fields.String,
})
