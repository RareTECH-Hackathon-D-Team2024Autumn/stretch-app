from stretch_app import create_app

flask_stretch_app = create_app()

if __name__ == '__main__':
    flask_stretch_app.run(debug=True, host='0.0.0.0', port=5001)