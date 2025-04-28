# rabbitmq-explore - Direct Exchange Branch

This branch demonstrates the use of **Direct Exchange** in RabbitMQ, where messages are routed to specific queues based on an exact routing key match. The producer sends messages to an exchange with specific routing keys, and the consumer listens for messages from queues bound to the exchange with those same keys.

## Project Overview

- **Branch**: `direct`
- **Exchange Type**: Direct Exchange
- **Feature Focus**: Routing messages based on exact matching routing keys.

### How it works:
- **Producer**: Sends messages to a direct exchange using routing keys (e.g., `lang.en`, `lang.fr`) to target specific queues.
- **Consumer**: Consumes messages from queues that are bound to the exchange with corresponding routing keys.

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

The consumer listens for messages on two queues, one for English (`direct_queue_en`) and one for French (`direct_queue_fr`). The queues are bound to the exchange with specific routing keys (`lang.en` for English, `lang.fr` for French).

- **`channel.assertExchange()`**: Declares the exchange of type "direct."
- **`channel.assertQueue()`**: Declares two queues, one for each language.
- **`channel.bindQueue()`**: Binds the queues to the exchange using the respective routing keys (`lang.en` and `lang.fr`).
- **`channel.consume()`**: The consumer listens to messages from each queue, acknowledging the messages after processing.

## Producer Explanation

The producer sends messages to the direct exchange (`lang_exchange`) using routing keys (`lang.en` for English and `lang.fr` for French). These messages are routed to the corresponding queues based on the binding with the exchange.

- **`channel.assertExchange()`**: Declares the exchange of type "direct."
- **`channel.publish()`**: Sends messages to the exchange with specific routing keys.
- **`Buffer.from()`**: The message is sent as a buffer, containing the string content.

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

This project demonstrates the use of RabbitMQ **Direct Exchange** to route messages to specific queues based on exact routing key matches. The consumer consumes messages from the queues bound to the exchange with the appropriate routing key, while the producer sends messages to the exchange with those keys.
