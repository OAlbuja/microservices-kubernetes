const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const client = redis.createClient({
    socket: {
        host: 'redis-service', // Nombre del servicio Redis en Kubernetes
        port: 6379
    }
});

client.on('error', (err) => console.error('Redis Error:', err));

async function connectRedis() {
    await client.connect();
    await client.set('visits', 0);
}

connectRedis();

app.get('/visits', async (req, res) => {
    const visits = await client.get('visits');
    await client.set('visits', parseInt(visits) + 1);
    res.send(`Número de visitas: ${visits}`);
});

app.listen(4001, () => {
    console.log('Visit-Service corriendo en puerto 4001');
});
