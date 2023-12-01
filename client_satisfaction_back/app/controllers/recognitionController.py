import os
import base64
from flask import  jsonify
from flask_restx import Resource, Namespace

from ..models.recognition_api_model import upload_input_model
from ..faceRecognitionProcess.faceDetectionProcess import find_target_face
from ..sensationRecognitionProcess.humeurRecognition import sensationProcess

recognitionNs = Namespace("Recognition/")

@recognitionNs.route("/")
class clients_adressAPI(Resource):
    @recognitionNs.expect(upload_input_model)
    def post(self):
        file_content = recognitionNs.payload['file']

        # Extract the base64 encoded image data
        _, encoded_data = file_content.split(',', 1)
        decoded_data = base64.b64decode(encoded_data)

        # Save the image inn  folder
        filename = recognitionNs.payload['fileName']
        filepath = os.path.join("./", filename)
        with open(filepath, 'wb') as file:
            file.write(decoded_data)
        
        name = find_target_face()
        sensation = sensationProcess()

        return {'message': name, 'sentiment':sensation}

    def get(self):
        filename = 'copie.jpg'
        filepath = os.path.join("./", filename)

        with open(filepath, 'rb') as file:
            image_data = file.read()

        encoded_data = base64.b64encode(image_data).decode('utf-8')
        data_url = f'data:image/jpg;base64,{encoded_data}'

        return jsonify({'dataURL': data_url})
