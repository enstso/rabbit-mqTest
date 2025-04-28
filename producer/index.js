const amqp = require("amqplib");

async function produce() {
  try {
    // Connect to RabbitMQ
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    // Define the exchange and routing key
    const exchange = "lang_exchange";
    const routingKey = "lang.en"; // This is the routing key used to bind the queue to the exchange
    const message = "Hello, i speak English!";

    await channel.assertExchange(exchange, "direct", { durable: false });

    // Publish a message to the exchange with the routing key
    await channel.publish(exchange, routingKey, Buffer.from(message), {
      persistent: false,
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
