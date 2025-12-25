from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Bienvenue sur la serie d'exercices Docker!"})

@app.route('/api/users')
def users():
    return jsonify({
        "users": [
            {"id": 1, "name": "Benjamin"},
            {"id": 2, "name": "Benjamin09e"},
        ]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)