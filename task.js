const fs = require('fs');
const path = require('path');

function task(user_id) {
    const logMessage = `${user_id} - task completed at - ${Date.now()}\n`;
    fs.appendFileSync(path.join(__dirname, 'task.log'), logMessage);
    console.log(logMessage);
}

module.exports = task;