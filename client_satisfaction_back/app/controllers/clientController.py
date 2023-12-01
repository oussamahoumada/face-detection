import os
from sqlalchemy import  delete
from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import client
from .recognitionController import uploadImage
from ..models.client_api_model import client_model, client_input_model,client_delete_model

clientNs = Namespace("Client/")

@clientNs.route("/")
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
            image = os.path.join("./app/peoples/", clientNs.payload['img_name']),
            discount = clientNs.payload['discount'],
            Satisfaction = clientNs.payload['Satisfaction'],
            dateNaissance = clientNs.payload['dateNaissance'],
        )
        db.session.add(clt)
        db.session.commit()
        
        uploadImage(clientNs.payload['image'], "./app/peoples/", clientNs.payload['img_name'])
        
        return clt

@clientNs.route("/delete")
class client_adressAPI(Resource):    
    @clientNs.expect(client_delete_model)
    def post(self):
        lst=[]
        for i in clientNs.payload["ids"]:
            lst.append(i['id'])
        client_del = delete(client).where(client.client_id.in_(lst))

        db.session.execute(client_del)
        db.session.commit()
        return "delete success",200

@clientNs.route("/<int:id>")
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
