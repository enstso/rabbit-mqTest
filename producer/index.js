const amqp = require("amqplib");

async function produce() {
  try {
    // Connect to RabbitMQ
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const exchange = "fanout_exchange";
    const message = "Hello, fanout";

    // declare the exchange
    await channel.assertExchange(exchange, "fanout", { durable: true });

    // Publish a message to the exchange
    channel.publish(exchange,"", Buffer.from(message), {
      persistent: true,
    });

    console.log("Message sent: %s", message);

    setTimeout(() => {
      channel.close();
      connection.close();
      console.log("Connection closed");
    }, 500); // Wait for the message to be sent before closing the connection
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
    process.exit(1);
  }
}

produce();
