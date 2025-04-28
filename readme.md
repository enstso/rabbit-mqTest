# rabbitmq-explore - Fanout Exchange Branch

This branch demonstrates the use of **Fanout Exchange** in RabbitMQ, where messages are broadcasted to all queues bound to the exchange, regardless of routing keys. This is particularly useful for scenarios where you want all consumers to receive the same messages.

## Project Overview

- **Branch**: `fanout`
- **Exchange Type**: Fanout Exchange
- **Feature Focus**: Broadcasting messages to multiple queues.

### How it works:
- **Producer**: Sends messages to a fanout exchange, and the message is distributed to all queues bound to the exchange.
- **Consumer**: Listens to different queues, receiving the same message as long as the queue is bound to the fanout exchange.

To run the project, use the following Docker command:

```bash
docker-compose up -d --build
```

## Setup Environment

The project requires a `.env` file for configuration. To set it up:

1. Copy the example `.env.example` file to `.env`:

```bash
cp .env.example .env
```

## Consumer Explanation

The consumer listens to two queues: `fanout_queue1` and `fanout_queue2`. Both queues are bound to the same **fanout exchange**. The consumer receives the same message from each queue, as fanout exchanges broadcast messages to all bound queues.

- **`channel.assertExchange()`**: Declares the exchange of type "fanout," which ensures messages are sent to all queues bound to it.
- **`channel.assertQueue()`**: Declares two queues, one for each consumer.
- **`channel.bindQueue()`**: Binds both queues to the fanout exchange, so they receive messages.
- **`channel.consume()`**: The consumer listens for messages from each queue, acknowledging the messages once they are processed.

## Producer Explanation

The producer sends messages to the **fanout exchange** (`fanout_exchange`). Since fanout exchanges do not use routing keys, the message is broadcasted to all queues bound to the exchange.

- **`channel.assertExchange()`**: Declares the exchange of type "fanout."
- **`channel.publish()`**: Sends a message to the exchange without a routing key, allowing it to be broadcast to all bound queues.
- **`Buffer.from()`**: Converts the message content into a buffer for transmission.

## Docker Setup

To start the RabbitMQ environment using Docker, follow these steps:

1. **Build and run the containers**:

```bash
docker-compose up -d --build
```

2. **RabbitMQ Management Console**: You can access the RabbitMQ management console at:

```text
http://localhost:15672/
```

- **Username**: ?
- **Password**: ?

3. **Stop the containers**:

To stop the containers, use:

```bash
docker-compose down
```

## Requirements

- Docker
- Node.js (for running the producer and consumer scripts)

## Conclusion

This project demonstrates the use of **Fanout Exchange** in RabbitMQ, where messages are broadcasted to all queues bound to the exchange, allowing for a one-to-many message distribution pattern.