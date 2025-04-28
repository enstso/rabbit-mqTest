const amqp = require("amqplib");

async function produce() {
  try {
    // Connect to RabbitMQ
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    // Define the exchange and routing key
    const exchange = "lang_exchange";
    const routingKeyEn = "lang.en"; // This is the routing key used to bind the queue to the exchange
    const routiongKeyFr = "lang.fr"; // This is the routing key used to bind the queue to the exchange

    const messageEn = "Hello, i speak English!";
    const messageFr = "Bonjour, je parle français!";

    await channel.assertExchange(exchange, "direct", { durable: false });

    // publish messages to the exchange with the routing keys
    // The messages will be sent to the queues bound to the exchange with the corresponding routing keys
    channel.publish(exchange, routingKeyEn, Buffer.from(messageEn), {
      persistent: false,
    });

    channel.publish(exchange, routiongKeyFr, Buffer.from(messageFr), {
      persistent: false,
    });

    console.log("Message En sent: %s", messageEn);
    console.log("Message Fr sent: %s", messageFr);

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
