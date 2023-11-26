import os
import cv2
import numpy as np
from keras.models import model_from_json
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

json_file = open("app/sensationRecognitionProcess/emotiondetector.json", "r")
model_json = json_file.read()
json_file.close()
model = model_from_json(model_json)

model.load_weights("app/sensationRecognitionProcess/emotiondetector.h5")
haar_file=cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade=cv2.CascadeClassifier(haar_file)

def extract_features(image):
    feature = np.array(image)
    feature = feature.reshape(1,48,48,1)
    return feature/255.0

labels = {0 : 'angry', 1 : 'disgust', 2 : 'fear', 3 : 'happy', 4 : 'neutral', 5 : 'sad', 6 : 'surprise'}


def sensationProcess():
    im=cv2.imread(os.path.abspath('copie.jpg'))
    gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
    faces=face_cascade.detectMultiScale(im,1.3,5)
    try: 
        for (p,q,r,s) in faces:
            image = gray[q:q+s,p:p+r]
            cv2.rectangle(im,(p,q),(p+r,q+s),(255,0,0),2)
            image = cv2.resize(image,(48,48))
            img = extract_features(image)
            pred = model.predict(img)
            prediction_label = labels[pred.argmax()]
            print("Predicted Output:", prediction_label)
            # cv2.putText(im,prediction_label)
            cv2.putText(im, '% s' %(prediction_label), (p-10, q-10),cv2.FONT_HERSHEY_COMPLEX_SMALL,2, (0,0,255))
        return prediction_label
        #cv2.imshow("Output",im)
        #cv2.waitKey(27)
    except cv2.error:
        pass


'''
def sensationProcess():
    image_path = os.path.abspath('copie.jpg')
    # Load the pre-trained emotion detection model (you need to have a model file)
    emotion_model = load_model("app/sensationRecognitionProcess/emotiondetector.h5")

    # Load and preprocess the image
    img_path = image_path
    img = image.load_img(img_path, target_size=(48, 48), color_mode='grayscale')  # Convert the image to grayscale
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

    # Rescale pixel values to the range [0, 255]
    img_array /= 255.0

    # Get predictions from the emotion detection model
    emotion_predictions = emotion_model.predict(img_array)

    # Decode predictions (if your model outputs class probabilities)
    emotions = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

    predicted_emotion = emotions[np.argmax(emotion_predictions)]

    # Print the predicted emotion
    print('Predicted Emotion:', predicted_emotion)

    return predicted_emotion
'''