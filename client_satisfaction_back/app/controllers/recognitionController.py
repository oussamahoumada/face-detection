import os
import base64
from flask import  jsonify
from flask_restx import Resource, Namespace

from ..faceRecognitionProcess.faceDetectionProcess import recognize_faces
from ..sensationRecognitionProcess.humeurRecognition import sensationProcess
from ..models.recognition_api_model import upload_input_model, load_input_model

recognitionNs = Namespace("Recognition/")

@recognitionNs.route("/upload_image")
class clients_adressAPI(Resource):
    @recognitionNs.expect(upload_input_model)
    def post(self):
        file_content = recognitionNs.payload['file']

        filename = 'image_to_recognize.jpg'
        uploadImage(file_content, "./", filename)
        
        name = recognize_faces("image_to_recognize.jpg", os.path.abspath('./app/peoples/'))
        
        sensation = sensationProcess()

        return {'message': name, 'sentiment':sensation}
    
@recognitionNs.route("/load_image")
class clients_adressAPI(Resource):
    @recognitionNs.expect(load_input_model)
    def post(self):
        filename = recognitionNs.payload['path']
        filepath = os.path.join("./", filename)

        with open(filepath, 'rb') as file:
            image_data = file.read()

        encoded_data = base64.b64encode(image_data).decode('utf-8')
        data_url = f'data:image/jpg;base64,{encoded_data}'

        return jsonify({'dataURL': data_url})

def uploadImage(img, path, name):
    # Extract the base64 encoded image data
    _, encoded_data = img.split(',', 1)
    decoded_data = base64.b64decode(encoded_data)

    # Save the image inn  folder
    filename = name
    filepath = os.path.join(path, filename)
    with open(filepath, 'wb') as file:
        file.write(decoded_data)
