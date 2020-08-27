require("dotenv").config();

module.exports = {
    error(author, error) {
        author.send("Ocorreu um erro ao tentar executar este comando: " + error);
    },
    log(client, message) {
        client.channels.fetch(process.env.ADMIN_LOG_CHANNEL_ID).then(channel => {
            channel.send(message)
        });
    },
    isValidIcao(icao) {
        if(icao.length < 4 || icao.length > 4) {
            return false;
        }
        if(/[aA-zZ]{4}/.test(icao) === false) {
            return false;
        }
        return true;
    },
    isValidDate(date) {
        return !isNaN(Date.parse(date));

    },
    getPilotId(nickname) {
        const pilot = {
            isValid: false,
            fullId: '',
            databaseId: '',
            error: ''
        }
        if(nickname == null){
            pilot.error = 'Seu apelido não esta formatado corretamente!';
            return pilot;
        }
        const pilotArgs = nickname.split(' - ');
        if(pilotArgs.length !== 2) {
            pilot.error = 'Seu apelido não esta formatado corretamente!';
            return pilot;
        }
        if(!pilotArgs[1].startsWith('TOP')){
            pilot.error = 'Não foi possível indentificar sua matrícula';
            return pilot;
        }
        pilot.fullId = pilotArgs[1];
        const pilotFullArgs = pilotArgs[1].split("");
        if(pilotFullArgs.length !== 7 ) {
            pilot.error = 'Não foi possível indentificar sua matrícula';
            return pilot;
        }
        let pilotCallsignNumbers = pilotFullArgs[3].toString() + pilotFullArgs[4].toString() + pilotFullArgs[5].toString() + pilotFullArgs[6].toString();
        pilotCallsignNumbers = parseInt(pilotCallsignNumbers);
        if(!Number.isInteger(pilotCallsignNumbers)){
            pilot.error = 'Seu indicativo númerico não é um número';
            return pilot;
        }
        const databaseId = pilotCallsignNumbers - 1000
        if(databaseId < 0) {
            pilot.error = 'Seu indicativo númerico não é válido!'
            return pilot;
        }
        pilot.databaseId = databaseId;
        pilot.isValid = true;
        return pilot;
    },
    formatDate(date) {
        return date.getDate() + "/" + ((date.getMonth() + 1) < 10 ? '0' +(date.getMonth() + 1) : (date.getMonth() + 1)) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    },
    getUTCTime() {
        const today = new Date();
        return today.getUTCFullYear() + "-" + (today.getUTCMonth() + 1) + "-" + today.getUTCDate() + " " + today.getUTCHours() + ":" + today.getUTCMinutes() + ":" + today.getUTCSeconds()
    } 
}