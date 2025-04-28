const amqp = require("amqplib");

async function consume() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const exchange = "lang_exchange";
    const queue = "direct_queue";
    const routingKey = "lang.en"; // This is the routing key used to bind the queue to the exchange

    // Create an exchange
    await channel.assertExchange(exchange, "direct", { durable: false });

    // Create a queue
    await channel.assertQueue(queue, { durable: false });

    await channel.bindQueue(queue, exchange, routingKey);

    console.log("Waiting for messages in queue:", queue);

    channel.consume(
      queue,
      (msg) => {
        console.log("Received: %s", msg.content.toString());
        // Acknowledge the message
        channel.ack(msg);
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
