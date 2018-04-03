from flask import Flask
from flask import request, Response
import utils
import json

app = Flask(__name__)


@app.route('/extract-entities', methods=['POST'])
def extract_entities():
    request_data = request.get_json()
    labels = utils.parse_trip_steps(request_data)
    return Response(json.dumps(labels),  mimetype='application/json')


#
# @app.route("/")
# def hello_world():
#     labels = [(ent.label_, ent.text) for ent in utils.extract_locations().ents]
#     return Response(json.dumps(labels),  mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True, port=5000) 
