# Advanced Task Queue System with Rate Limiting

## Overview

This project implements a sophisticated task queue system with integrated rate limiting, designed for high-performance, scalable applications. It leverages Redis for distributed queue management and rate limiting, ensuring robust handling of concurrent requests and prevention of system abuse.

## Core Components

### 1. Express Server (`index.js`)
- Initializes an Express application to handle HTTP requests.
- Integrates with Redis for distributed state management.
- Implements a POST endpoint `/task` for task submission.

### 2. Queue Management (`bull`)
- Utilizes the `bull` library for Redis-backed queue operations.
- Configures a task queue (`taskQueue`) for asynchronous job processing.

### 3. Rate Limiting (`rate-limiter-flexible`)
- Implements Redis-based rate limiting using `RateLimiterRedis`.
- Configured for 20 requests per 60 seconds per user, with a 1-second block duration.

### 4. Task Processing (`task.js`)
- Defines the core task logic executed for each queued job.
- Logs task completion with user ID and timestamp.

## Technical Specifications

### Rate Limiting
- **Algorithm**: Token Bucket
- **Limit**: 20 requests per 60 seconds per user
- **Block Duration**: 1 second
- **Storage**: Redis

### Queue Configuration
- **Backend**: Redis
- **Job Processing**: Asynchronous with Bull

### Error Handling
- Implements sophisticated error catching for rate limiter exceptions.
- Differentiates between rate limit errors and other runtime errors.

## API Endpoints

### POST /task
- **Purpose**: Submit a task to the queue
- **Body**: `{ "user_id": string }`
- **Responses**:
  - 200 OK: Task successfully queued
  - 429 Too Many Requests: Rate limit exceeded

## Performance Considerations

- Utilizes Redis for both queue management and rate limiting, ensuring high throughput and low latency.
- Asynchronous job processing prevents blocking of the main event loop.
- Rate limiting is applied before task queuing to prevent queue flooding.

## Scalability

- The system is designed to be horizontally scalable.
- Redis can be configured in a cluster mode for increased throughput.
- Bull queues can be distributed across multiple worker processes or machines.

## Security

- Implements rate limiting as a primary defense against DoS attacks.
- Uses environment variables for sensitive configurations (not shown in provided code).

## Logging and Monitoring

- Console logging for server startup and task completion.
- File-based logging for task completions (`task.log`).

## Development and Deployment

- `.gitignore` file configured for Node.js projects, excluding common development artifacts and sensitive files.
- Assumes a Node.js runtime environment.

This system is optimized for high-concurrency scenarios where precise control over task execution rates and robust queue management are critical. It's suitable for expert-level developers working on distributed systems with stringent performance requirements.

## Quick Start

### Prerequisites

- Node.js (v14+ recommended)
- Redis server

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/advanced-task-queue.git
cd advanced-task-queue
```

Install dependencies:

```bash
npm install
```

### Running the Server

Start the server:

```bash
npm start
```

### Testing the API

Submit a task:

```bash
curl -X POST http://localhost:3000/task -H "Content-Type: application/json" -d '{"user_id": "user123"}'
```

Check the task completion log:

```bash
tail -f task.log
```
