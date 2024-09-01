const express = require('express');
const Queue = require('bull');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');
const task = require('./task');

const app = express();
const redisClient = new Redis();
app.use(express.json());

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 20,
    duration: 60,
    blockDuration: 1
});

const taskQueue = new Queue('taskQueue', { redis: redisClient });

taskQueue.process(async (job) => {
    task(job.data.user_id);
});

app.post('/task', async (req, res) => {
    const { user_id } = req.body;

    try {
        await rateLimiter.consume(user_id);
        taskQueue.add({ user_id });
        res.status(200).send('Task added to queue');
    } catch (rateLimiterError) {
        if (rateLimiterError instanceof Error) {
            res.status(429).send('Rate limit exceeded');
        } else {
            taskQueue.add({ user_id });
            res.status(200).send('Task added to queue (rate limit exceeded)');
        }
    }
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});