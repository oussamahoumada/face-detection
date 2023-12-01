import os
import numpy as np
import face_recognition

def load_images_from_folder(folder):
    images = []
    for filename in os.listdir(folder):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            image_path = os.path.join(folder, filename)
            image = face_recognition.load_image_file(image_path)
            face_encodings = face_recognition.face_encodings(image)
            if face_encodings:  # Check if a face is found in the image
                images.append((filename.split(".")[0], np.array(face_encodings[0])))  # Convert encoding to np.ndarray
    return images

def recognize_faces(image_to_check, path):
    known_faces = load_images_from_folder(path)
    # Load the image to check
    unknown_image = face_recognition.load_image_file(image_to_check)

    # Find all face locations in the unknown image
    face_locations = face_recognition.face_locations(unknown_image)
    
    # Encode faces in the unknown image
    unknown_face_encodings = face_recognition.face_encodings(unknown_image, face_locations)

    # Loop through each face found in the unknown image
    for i, unknown_face_encoding in enumerate(unknown_face_encodings):
        # Compare the unknown face encoding with the known face encodings
        if known_faces:
            matches = face_recognition.compare_faces([face[1] for face in known_faces], unknown_face_encoding)

            name = "Unknown"  # Default name if no match is found

            # Check if a match is found
            if True in matches:
                first_match_index = matches.index(True)
                name = known_faces[first_match_index][0]  # Get the name corresponding to the matching face

            print(f"Face {i + 1}: {name}")
            return name
