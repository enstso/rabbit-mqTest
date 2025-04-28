# rabbitmq-explore - Main Branch

This is the **main** branch of the `rabbitmq-explore` project, which contains a basic example of how to use RabbitMQ for message queuing with a simple queue setup. In this branch, we focus on a straightforward message exchange between a producer and a consumer.

## Project Overview

- **Main Branch**: Contains a basic example of a producer and consumer using a simple queue.
- **Other Branches**:
  - **`topic`**: Demonstrates the use of **Topic Exchange** in RabbitMQ, where routing keys allow for more complex message routing based on patterns.
  - **`direct`**: Demonstrates **Direct Exchange**, where messages are routed to specific queues based on exact routing key matches.
  - **`fanout`**: Demonstrates **Fanout Exchange**, where messages are broadcast to all queues bound to the exchange.
  - **`prefetch`**: Demonstrates the use of the **prefetch** setting in RabbitMQ to limit the number of unacknowledged messages sent to a consumer at a time.

## Main Branch: Simple Queue Example

### Consumer

The consumer listens to a queue named **`test_queue`**. Once the consumer is started, it waits for messages from the queue and logs the messages when they are received.

- **`channel.assertQueue()`**: Declares a durable queue, meaning the queue will survive RabbitMQ restarts.
- **`channel.consume()`**: Listens for incoming messages on the queue, and for each message, logs it to the console.

### Producer

The producer sends a message to the **`test_queue`**. The message is sent as a persistent message to ensure it’s not lost even if RabbitMQ crashes.

- **`channel.assertQueue()`**: Declares the same durable queue.
- **`channel.sendToQueue()`**: Sends a persistent message to the queue.

---

## Other Branches in the Project

### 1. **`topic`** Branch
This branch demonstrates the use of **Topic Exchange** in RabbitMQ. The producer sends messages with routing keys like `france.department`, and the consumer receives messages based on the routing key patterns, e.g., `france.*` or `*.department.*`. This allows for more flexible routing rules compared to direct routing.

- **Commands**: 

```bash
git checkout topic
```

### 2. **`direct`** Branch
This branch shows the **Direct Exchange** in RabbitMQ. The producer sends messages with specific routing keys (e.g., `lang.en` and `lang.fr`), and the consumer listens to specific queues bound to those routing keys (e.g., `direct_queue_en` for English messages and `direct_queue_fr` for French messages). This ensures messages are routed directly to the intended queues based on the exact routing key.

- **Commands**:

```bash
git checkout direct
```

### 3. **`fanout`** Branch
In the **Fanout Exchange** branch, the producer sends messages to a fanout exchange, and all bound queues receive the message. It is a one-to-many pattern where every queue bound to the exchange gets the same message.

- **Commands**:

```bash
git checkout fanout
```

### 4. **`prefetch`** Branch
The **Prefetch** branch demonstrates how to use the `prefetch` setting in RabbitMQ. This allows the consumer to limit the number of unacknowledged messages sent at a time, which is useful for controlling the load on consumers.

- **Commands**:

```bash
git checkout prefetch
```

---

## Setup Environment

1. **Clone the repository**:

```bash
git clone https://github.com/enstso/rabbitmq-explore.git
cd rabbitmq-explore
```

2. **Copy the `.env.example` to `.env`**:

```bash
cp .env.example .env
```


3. **Install Dependencies**:

```bash
npm install
```

4. **Run Docker** (optional, to run RabbitMQ in a container):

```bash
docker-compose up -d --build
```

5. **Access RabbitMQ**: If you're using Docker, you can access the RabbitMQ management interface at:

```text
http://localhost:15672/
```

- **Username**: ?
- **Password**: ?

## Conclusion

This project demonstrates various RabbitMQ exchange types (e.g., **Direct**, **Topic**, **Fanout**, **Prefetch**) and how to integrate them with a Node.js producer and consumer. The **main branch** provides a simple example using a queue, while the other branches show more complex scenarios with different exchange types.