# rabbitmq-explore - Prefetch Branch

This branch demonstrates the use of **message prefetching** with RabbitMQ. Prefetching allows the consumer to limit the number of messages it retrieves from RabbitMQ at once, preventing it from being overwhelmed by too many messages. This is particularly useful when a consumer is busy processing messages and should not be overloaded with new ones.

## Project Overview

- **Branch**: `prefetch`
- **Exchange Type**: Default (direct queue used)
- **Feature Focus**: Message Prefetching in RabbitMQ

In this branch:
- The **consumer** fetches messages with a prefetch count to limit the number of unacknowledged messages at any given time.
- The **producer** sends a large number of messages (10,000 in this case) to a queue and demonstrates how prefetching can help manage the load.

**setup your .env**

To run the project, use the following command:

```bash
docker-compose up -d --build
```

This will spin up the necessary environment with RabbitMQ for running the producer and consumer.

## Consumer Code

The consumer limits the number of unacknowledged messages it fetches at once to 3, which is configured by the `prefetch(3)` call. It then processes each message and acknowledges it once done.

### Explanation:

- **`channel.prefetch(3)`**: The consumer will only receive 3 unacknowledged messages at once. This allows the consumer to manage its workload and avoid being overloaded.
- **Queue Declaration**: The queue is durable (`durable: true`), meaning the messages will survive server restarts.
- **Acknowledgement**: Each message is acknowledged after it is processed using `channel.ack(msg)`.

## Producer Code

### Explanation:

- **Message Sending**: The producer sends 10,000 messages to the `prefetch_queue`, each with a different message content (`Hello nb: 0`, `Hello nb: 1`, etc.).
- **Queue Declaration**: The queue is also durable to ensure messages are persisted.
- **Message Persistence**: Messages are sent with `persistent: false` to ensure that they are not persisted to disk.

## Docker Setup

The project is set up using Docker Compose to simplify the process of running RabbitMQ and the producer/consumer applications.

### Steps to Run the Project:

1. **Build and run the Docker containers**:

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

This project demonstrates how to use RabbitMQ's **prefetching** feature to limit the number of unacknowledged messages sent to a consumer at once. By using this feature, consumers can process messages at a controlled rate, preventing them from being overwhelmed.
