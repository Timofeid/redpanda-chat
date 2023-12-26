from flask import Flask, Response, send_from_directory, request
from flask_cors import CORS, cross_origin
from kafka import KafkaProducer, KafkaConsumer


BOOTSTRAP_SERVERS = "localhost:9092"
TOPIC_NAME = "messages"

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/message', methods=['POST'])
def send_message():
    try:
        message = request.json
        producer = KafkaProducer(bootstrap_servers=[BOOTSTRAP_SERVERS])
        producer.send(TOPIC_NAME, bytes(f'{message}', 'UTF-8'))
        producer.close()
        return message
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return None

@app.route('/messages', methods=['GET'])
def get_messages():
    consumer = KafkaConsumer(TOPIC_NAME, 
                             auto_offset_reset='earliest', 
                             enable_auto_commit=False, 
                             bootstrap_servers=[BOOTSTRAP_SERVERS])
    def events():
        for message in consumer:
            try:
                yield 'data: {0}\n\n'.format(message.value.decode('utf-8'))
            except Exception as err:
                print(f"Unexpected {err=}, {type(err)=}")
    return Response(events(), mimetype="text/event-stream")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001)