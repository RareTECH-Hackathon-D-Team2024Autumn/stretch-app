from app import create_app
from dotenv import load_dotenv
import os

load_dotenv()
DEBUG = os.getenv('DEBUG')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')

flask_stretch_app = create_app()

if __name__ == '__main__':
    flask_stretch_app.run(host=HOST, port=PORT)