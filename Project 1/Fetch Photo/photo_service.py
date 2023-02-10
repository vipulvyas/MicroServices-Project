from flask import Flask, jsonify, request
from pymongo import MongoClient
import os
import redis
from dotenv import load_dotenv
import requests
load_dotenv()

redis_host = os.getenv("REDIS_HOST")
mongo_url = os.getenv("MONGO_URL")
redis_port = os.getenv("REDIS_PORT")
auth_service_host = os.getenv('AUTH_SERVICE_HOST')
auth_service_port = os.getenv('AUTH_SERVICE_PORT')

app = Flask(__name__)

# Connect to Redis cache
cache = redis.Redis(host=redis_host, port=6379, db=0)

# Connect to MongoDB
client = MongoClient(mongo_url)
db = client["photodb"]
photos_collection = db["photos"]

def validateToken(token):
    if not token:
        return False
    auth_url = 'http://'+ auth_service_host + ':' + auth_service_port + '/api/auth/validatetoken'
    login_response = requests.post(auth_url, json={'token': token})
    if login_response.status_code != 200:
        return False
    return True

@app.route('/photos/<user_id>/<album_name>', methods=['GET'])
def get_photos(user_id, album_name):
    token = request.headers.get('token')

    is_valid = validateToken(token)
    if not is_valid:
        return jsonify({'error': 'Not Authoried'}), 401

    # Check if photos are in Redis
    photos = cache.hget(user_id, album_name)
    if photos:
        # Convert binary data to string and return photos if they are in Redis
        return jsonify({'photos': photos.decode('utf-8')})

    # If photos are not in Redis, fetch from MongoDB
    photos_from_db = photos_collection.find_one({'user_id': user_id, 'album_name': album_name})
    if photos_from_db:
        # Store photos in Redis
        cache.hset(user_id, album_name, photos_from_db['photos'])

        # Return photos from MongoDB
        return jsonify({'photos': photos_from_db['photos']})

    # Return an error if photos are not found in Redis or MongoDB
    return jsonify({'error': 'Photos not found'}), 404


@app.route('/photos', methods=['POST'])
def post_photo():

    token = request.headers.get('token')

    is_valid = validateToken(token)
    if not is_valid:
        return jsonify({'error': 'Not Authoried'}), 401
    
    album_name = request.json.get('album_name')
    photo_url = request.json.get('photo_url')
    user_id = request.json.get('user_id')
    
    # Check if the album exists for the user
    album = photos_collection.find_one({'user_id': user_id, 'album_name': album_name})
    if album:
        photos_collection.update_one({'_id': album['_id']}, {'$push': {'photos': photo_url}})
    else:
        album = {
            'user_id': user_id,
            'album_name': album_name,
            'photos': [photo_url]
        }
        photos_collection.insert_one(album)
    
    album['photos'].append(photo_url)
    # Set the photos for the album in Redis
    cache.hset(user_id, album_name, str(album['photos']))
    
    return jsonify({'message': 'Photo added successfully'})

if __name__ == '__main__':
    app.run(debug=True)
