const amqp = require('amqplib/callback_api');

// Connexion à RabbitMQ
const rabbitmqUrl = process.env.RABBITMQ_URL;

amqp.connect(rabbitmqUrl, (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'test_queue';

    // Créer une queue
    channel.assertQueue(queue, {
      durable: false
    });

    // Consommer les messages
    console.log('En attente de messages...');
    channel.consume(queue, (msg) => {
      console.log("Reçu : %s", msg.content.toString());
    }, {
      noAck: true
    });
  });
});
