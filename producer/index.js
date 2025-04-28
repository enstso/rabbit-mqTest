const amqp = require("amqplib");

async function produce() {
  try {
    // Connect to RabbitMQ
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const queue = "company_topic";

    // messages to be sent
    const messages = [
      {
        routingKey: "france.department.rh",
        message: "Le salarié 1 a 2000€ (department)",
      },
      {
        routingKey: "uk.department.hr",
        message: "Employee 1 has 2000$ (department)",
      },
      {
        routingKey: "france.department",
        message: "paie du mois (france and department)",
      },
      {
        routingKey: "uk.department",
        message: "pay of month (uk and department)",
      },
      { routingKey: "all.department.all", message: "all department (department)" },
    ];

    // check if the exchange exists
    await channel.assertExchange(queue, "topic", {
      durable: false,
    });

    // publish messages to the exchange
    for (let msg of messages) {
      channel.publish(queue, msg.routingKey, Buffer.from(msg.message), {
        persistent: false,
      });
      console.log("Message sent: %s", msg.message);
    }


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
