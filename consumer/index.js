const amqp = require("amqplib");

async function consume() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const queue1 = "fanout_queue1";
    const queue2 = "fanout_queue2";

    const exchange = "fanout_exchange";

    // Create a fanout exchange
    await channel.assertExchange(exchange, "fanout", { durable: true });

    // Create a queues
    await channel.assertQueue(queue1, { durable: true });
    await channel.assertQueue(queue2, { durable: true });

    // Bind the queue to the exchange
    await channel.bindQueue(queue1, exchange);
    await channel.bindQueue(queue2, exchange);

    // Consume messages
    console.log("Waiting for messages...");

    channel.consume(
      queue1,
      (msg) => {
        console.log("Received queue1: %s", msg.content.toString());
        channel.ack(msg); // Acknowledge the message
      },
      {
        noAck: false,
      }
    );

    channel.consume(
      queue2,
      (msg) => {
        console.log("Received queue2: %s", msg.content.toString());
        channel.ack(msg); // Acknowledge the message
      },
      {
        noAck: false,
      }
    );
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
    process.exit(1);
  }
}

consume();
