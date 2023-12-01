
import face_recognition as fr
import cv2 as cv
import os

file_path = os.path.abspath('copie.jpg')
target_image = fr.load_image_file(file_path)
target_encoding = fr.face_encodings(target_image)

def encode_faces(folder):
    list_people_encoding = []

    for filename in os.listdir(folder):
        known_image = fr.load_image_file(f'{folder}/{filename}')
        known_encoding = fr.face_encodings(known_image)[0]

        list_people_encoding.append((known_encoding, filename))
    
    return list_people_encoding

def find_target_face():
    face_location = fr.face_locations(target_image)
    print(face_location)
    for person in encode_faces(os.path.abspath('app/faceRecognitionProcess/people/')):
        encoded_face = person[0]
        filename = person[1]

        is_target_face = fr.compare_faces(encoded_face, target_encoding, tolerance=0.55)
        print(f'{is_target_face}{filename.split(".")[0]}')
        if('True' in is_target_face):
            return filename.split(".")[0]
        

        if face_location:
            face_number = 0
            for location in face_location:
                if is_target_face[face_number]:
                    label = filename.split(".")[0]
                    create_frame(location,label)
                
                face_number+=1
    
    return "not found"

def create_frame(location, label):
    top,right,bottom,left = location

    cv.rectangle(target_image, (left,top), (right, bottom), (255, 0, 0), 2)
    cv.rectangle(target_image, (left,bottom+20), (right, bottom), (255, 0, 0), cv.FILLED)

    cv.putText(target_image, label, (left+3,bottom+14), cv.FONT_HERSHEY_DUPLEX, 0.4, (255,255,255),1)
