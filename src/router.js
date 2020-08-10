module.exports = {
    execute_command(message) {
        const messageArgs = message.split(' ');
        const command = messageArgs[1];
        return command;
    }
};