from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_flask():
    return 'Hello Flask!'


# @app.route('/')
# def index():
#     return render_template('index.html')

# if __name__ == '__main__':
#     app.run()
