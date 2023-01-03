from flask import Flask, Response, send_from_directory, request
from flask_cors import CORS, cross_origin
from kafka import KafkaProducer, KafkaConsumer


BOOTSTRAP_SERVERS = # TODO: Set Redpanda bootstrap address
TOPIC_NAME = # TODO: Set the topic name for the chat

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/message', methods=['POST'])
def send_message():
    try:
        message = request.json
        # TODO: Implement the producer
        return message
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return None

@app.route('/messages', methods=['GET'])
def get_messages():
    consumer = None # TODO: Implement the consumer
    def events():
        for message in consumer:
            try:
                yield 'data: {0}\n\n'.format(message.value.decode('utf-8'))
            except Exception as err:
                print(f"Unexpected {err=}, {type(err)=}")
    return Response(events(), mimetype="text/event-stream")

