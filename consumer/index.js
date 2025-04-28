const amqp = require("amqplib");

async function consume() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const exchange = "lang_exchange";
    
    const queue1 = "direct_queue_en"; // This is the queue name for English messages
    const queue2 = "direct_queue_fr"; // This is the queue name for French messages

    const routingKeyEn = "lang.en"; // This is the routing key used to bind the queue to the exchange
    const routingKeyFr = "lang.fr"; // This is the routing key used to bind the queue to the exchange

    // Create an exchange
    await channel.assertExchange(exchange, "direct", { durable: false });
    
    // Create a queues
    await channel.assertQueue(queue1, { durable: false });
    await channel.assertQueue(queue2, { durable: false });

    // Bind the queues to the exchange with the routing keys
    await channel.bindQueue(queue1, exchange, routingKeyEn);
    await channel.bindQueue(queue2, exchange, routingKeyFr);

    console.log("Waiting for messages in queues:");

    channel.consume(
      queue1,
      (msg) => {
        console.log("Received from routingKey en: %s", msg.content.toString());
        // Acknowledge the message
        channel.ack(msg);
      },
      {
        noAck: false,
      }
    );

    channel.consume(
      queue2,
      (msg) => {
        console.log("Received from routingKey fr: %s", msg.content.toString());
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
