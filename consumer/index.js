const amqp = require("amqplib");

async function consume() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const exchange = "company_topic";
    const queue1 = "queue_france";
    const queue2 = "queue_uk";
    const queue3 = "queue_department";

    // create an exchange
    await channel.assertExchange(exchange, "topic", {
      durable: false,
    });

    // Create a queues
    await channel.assertQueue(queue1, {
      durable: false,
    });

    await channel.assertQueue(queue2, {
      durable: false,
    });

    await channel.assertQueue(queue3, {
      durable: false,
    });

    // bind queues to the exchange
    await channel.bindQueue(queue1, exchange, "france.*");
    await channel.bindQueue(queue2, exchange, "uk.*");
    await channel.bindQueue(queue3, exchange, "*.department.#");
    await channel.bindQueue(queue3, exchange, "*.department.*");

    // Consume messages
    console.log("Waiting for messages...");

    channel.consume(
      queue1,
      (msg) => {
        console.log("Received for france: %s", msg.content.toString());
        channel.ack(msg);
      },
      {
        noAck: false,
      }
    );
    channel.consume(
      queue2,
      (msg) => {
        console.log("Received for uk: %s", msg.content.toString());
        channel.ack(msg);
      },
      {
        noAck: false,
      }
    );

    channel.consume(
      queue3,
      (msg) => {
        console.log("Received for departments: %s", msg.content.toString());
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
