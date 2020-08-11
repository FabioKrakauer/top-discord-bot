module.exports = {
    error(author, error) {
        author.send("Ocorreu um erro ao tentar executar este comando: " + error);
    },
    log(client, message) {
        client.channels.fetch(process.env.ADMIN_LOG_CHANNEL_ID).then(channel => {
            channel.send(message)
        });
    }
}