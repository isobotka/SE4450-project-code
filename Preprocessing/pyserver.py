from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/flask/<filename>', methods=['GET'])
def index(filename):
    print(filename)
    import Predictor
    output=Predictor.predictfile(filename)
    print(output)
    return jsonify({'output': output})

if __name__ == "__main__":
    app.run(port=5000, debug=True)