import os
import base64
from flask_restx import Resource, Namespace
from flask import  jsonify

from ..extensions import db
from ..models.models import client
from ..models.client_api_model import client_model, client_input_model,upload_model, upload_input_model

clientNs = Namespace("API/")

@clientNs.route("/client")
class client_adressAPI(Resource):
    @clientNs.marshal_list_with(client_model)
    def get(self):
        return client.query.all()

    @clientNs.expect(client_input_model)
    @clientNs.marshal_with(client_model)
    def post(self):
        clt = client(
            name = clientNs.payload['name'],
            mail = clientNs.payload['mail'],
            image = clientNs.payload['image'],
            discount = clientNs.payload['discount'],
            Satisfaction = clientNs.payload['Satisfaction'],
            dateNaissance = clientNs.payload['dateNaissance'],
        )
        db.session.add(clt)
        db.session.commit()

        return clt


@clientNs.route("/client/<int:id>")
class clients_adressAPI(Resource):
    @clientNs.expect(client_input_model)
    @clientNs.marshal_with(client_model)
    def put(self,id):
        clt = client.query.get(id)
        if(clt):
            clt.name = clientNs.payload['name'],
            clt.mail = clientNs.payload['mail'],
            clt.image = clientNs.payload['image'],
            clt.discount = clientNs.payload['discount'],
            clt.Satisfaction = clientNs.payload['Satisfaction'],
            clt.dateNaissance = clientNs.payload['dateNaissance']

            db.session.merge(clt)
            db.session.flush()
            db.session.commit()

            return clt
        
        return "error",204
    
    @clientNs.expect(client_input_model)
    @clientNs.marshal_with(client_model)
    def delete(self,id):
        clt = client.query.get(id)
        if(clt):
            db.session.delete(clt)
            db.session.commit()

            return clt
    
        return "error",204
        

@clientNs.route("/image")
class clients_adressAPI(Resource):
    @clientNs.expect(upload_input_model)
    @clientNs.marshal_with(upload_model)
    def post(self):
        file_content = clientNs.payload['file']

        # Extract the base64 encoded image data
        _, encoded_data = file_content.split(',', 1)
        decoded_data = base64.b64decode(encoded_data)

        # Save the image inn  folder
        filename = clientNs.payload['fileName']
        filepath = os.path.join("./", filename)
        with open(filepath, 'wb') as file:
            file.write(decoded_data)

        return {'message': 'File uploaded successfully', 'filename': clientNs.payload['fileName']}

    def get(self):
        filename = 'copie.jpg'
        filepath = os.path.join("./", filename)

        with open(filepath, 'rb') as file:
            image_data = file.read()

        encoded_data = base64.b64encode(image_data).decode('utf-8')
        data_url = f'data:image/jpg;base64,{encoded_data}'

        return jsonify({'dataURL': data_url})


