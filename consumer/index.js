const amqp = require("amqplib");

async function consume() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const queue = "prefetch_queue";

    // Create a queue
    await channel.assertQueue(queue, {
      durable: true,
    });

    await channel.prefetch(3);

    // Consume messages
    console.log("Waiting for messages...");
    channel.consume(
      queue,
      (msg) => {
        console.log("Received: %s", msg.content.toString());
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
