from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/data')
def data():
    return jsonify({"message": "Hello from the server"})

@app.route('/send', methods=['POST'])
def send():
    data = request.json
    message = data.get('message')
    return jsonify({"response": f"Message received: {message}"})

if __name__ == '__main__':
    # Указываем пути к сертификату и ключу
    app.run(ssl_context=('cert.pem', 'key.pem'), host='127.0.0.1', port=5000)
