# redpanda-flask-chat-app-demo
Having fun with Python/React/Redpanda and SSE

Create Redpanda docker container
```
docker run -d --name=redpanda --rm \
    -p 9092:9092 \
    -p 9644:9644 \
    docker.vectorized.io/vectorized/redpanda:latest \
    redpanda start \
    --advertise-kafka-addr localhost \
    --overprovisioned \
    --smp 1  \
    --memory 1G \
    --reserve-memory 500M \
    --node-id 0 \
    --check=false
```

Create new topic 
```docker exec -it redpanda rpk topic create messages```

Install dependencies
```pip install kafka-python flask flask-cors
```


