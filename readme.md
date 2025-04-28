# rabbitmq-explore

This project is designed to explore RabbitMQ, specifically focusing on the use of the **Topic Exchange** pattern. It demonstrates the use of both a producer and consumer application that send and receive messages using RabbitMQ's topic exchange.

## Project Overview

- **Branch**: `topic`
- **Exchange Type**: `topic`
- **Docker**: The project is dockerized, and you can easily spin up the environment using Docker Compose.

To run the project, simply use the following command from the root directory:
```bash
docker-compose up -d --build
```

## Structure

- **Producer**: Sends messages to the RabbitMQ exchange with routing keys.
- **Consumer**: Listens for messages from queues bound to the exchange based on routing key patterns.

## RabbitMQ Topics

In RabbitMQ, a **topic exchange** is used to send messages to one or more queues based on the message routing key. The routing keys are used to match queues bound to the exchange. The producer publishes messages with specific routing keys, while the consumer listens for messages matching those keys.

The routing keys in this project follow the pattern: `country.department`, where:
- `country`: Represents the country (e.g., "france", "uk").
- `department`: Represents a department (e.g., "hr", "finance").

The consumer application binds multiple queues to the `company_topic` exchange based on different routing patterns.

**setup your .env**

```bash
mv .env.example .env
```

## Docker Setup

The project is set up using Docker Compose to simplify the process of running RabbitMQ and the producer/consumer applications. To start the environment:

1. Build and run the Docker containers:

```bash
docker-compose up -d --build
```

2. The RabbitMQ server will be running, and you can access the management console at:

```text
http://localhost:15672/
```

- **Username**: ?
- **Password**: ?

### Stop the containers

When you're done, you can stop the containers using:

```bash
docker-compose down
```

## Requirements

- Docker
- Node.js (for running the producer and consumer scripts)

## Conclusion

This project demonstrates how to use RabbitMQ with the **topic exchange** pattern to route messages to specific queues based on routing keys. The producer sends messages, while the consumer listens for messages bound to specific routing patterns. Docker is used to manage the environment, making it easy to spin up RabbitMQ and the necessary services.
