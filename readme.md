Here's an enhanced explanation for the **Topic** branch README, providing more context and clarity on how the **Topic Exchange** works within RabbitMQ:

---

# rabbitmq-explore - Topic Branch

This project is designed to explore RabbitMQ, specifically focusing on the use of the **Topic Exchange** pattern. It demonstrates how to implement a producer and consumer that interact using RabbitMQ's topic exchange to send and receive messages based on routing key patterns.

## Project Overview

- **Branch**: `topic`
- **Exchange Type**: `topic`
- **Docker**: The project is fully dockerized, allowing you to set up the environment easily using Docker Compose.

To run the project, use the following command from the root directory:
```bash
docker-compose up -d --build
```

### What is a Topic Exchange in RabbitMQ?

In RabbitMQ, a **Topic Exchange** allows routing of messages based on a routing key, which can follow specific patterns. This is more flexible than a direct exchange, as it allows you to bind queues to the exchange with wildcard characters in the routing keys.

- **Routing Key Patterns**:
  - `*` (Wildcard): Matches exactly one word in a routing key.
  - `#` (Wildcard): Matches zero or more words.

### Example Routing Key Patterns:
- `france.hr` (Matches the `france.hr` routing key)
- `*.hr` (Matches any routing key ending in `.hr`)
- `france.*` (Matches any routing key starting with `france.`)
- `*.department.*` (Matches routing keys like `france.department.sales` or `uk.department.finance`)

The main idea is to use routing keys with these patterns to control how messages are delivered to different queues.

---

## Project Structure

- **Producer**: Sends messages with specific routing keys to the RabbitMQ topic exchange.
- **Consumer**: Listens for messages from multiple queues that are bound to the exchange, using different routing key patterns.

In this branch, we use the `company_topic` exchange, which routes messages based on the following routing patterns:

- **Queue 1 (Queue for France)**: Binds to the routing pattern `france.*`.
- **Queue 2 (Queue for UK)**: Binds to the routing pattern `uk.*`.
- **Queue 3 (Queue for Departments)**: Binds to multiple patterns, such as `*.department.#`, to receive messages related to any department.

---

## Workflow Overview

### 1. **Producer**

The producer publishes messages to the **topic exchange** using specific routing keys, which are designed to match the routing patterns of the consumer's queues.

- **Routing Keys**: These keys are designed to match different queues that are bound to the exchange with specific patterns (like `france.department.hr`, `uk.department.finance`, etc.).
- The producer sends various messages, each with a routing key, ensuring the correct routing to the relevant queues.

### 2. **Consumer**

The consumer subscribes to the queues that are bound to the exchange using specific routing key patterns.

- **Queue Bindings**: The queues are bound to the exchange with patterns such as `france.*` or `*.department.#`, which means they will receive messages that match those patterns.
- The consumer listens for messages in these queues and processes them accordingly.

### Example of Routing Key Pattern in Use:
- A message with the routing key `france.department.hr` will be routed to a queue bound with the pattern `france.*` and `*.department.#`, ensuring multiple queues can receive different types of messages based on the patterns they are bound to.

---

## Docker Setup

The project uses Docker Compose to set up RabbitMQ and run the producer/consumer applications. Docker allows us to easily spin up the necessary environment for this project.

### Steps to Run the Project

1. **Set up environment variables**:
   
   First, copy the example environment configuration to `.env`:
   
   ```bash
   cp .env.example .env
   ```

   You should configure your RabbitMQ URL in the `.env` file (by default, it’s set to `amqp://guest:guest@localhost`).

2. **Build and run the Docker containers**:

   Once you have your `.env` file set up, run the following command from the root of the project:

   ```bash
   docker-compose up -d --build
   ```

   This command will:
   - Build the Docker images (if they haven’t been built already).
   - Spin up the RabbitMQ container and the necessary services.

3. **Access RabbitMQ**:

   If you want to access the RabbitMQ management console, you can visit:

   ```text
   http://localhost:15672/
   ```

   - **Username**: ?
   - **Password**: ?

### Stop the Containers

When you’re done, you can stop the containers using:

```bash
docker-compose down
```

This will stop and remove the containers, cleaning up the environment.

---

## Requirements

- **Docker**: For containerizing RabbitMQ and the application.
- **Node.js**: For running the producer and consumer scripts.
- **RabbitMQ**: Can be run locally or through Docker as part of this project.

---

## Conclusion

This project demonstrates the flexibility and power of RabbitMQ's **Topic Exchange**. By using routing keys with patterns (like `france.*` or `*.department.#`), the producer can send messages to specific queues based on the routing patterns, while the consumer can listen to those queues with matching patterns. Docker Compose is used to simplify the environment setup, making it easy to run RabbitMQ and the application in isolated containers.

The **topic exchange** pattern provides more advanced message routing capabilities, allowing for dynamic and highly configurable message distribution in a microservices environment.

---

Let me know if you need any further clarifications or additions to this README!
