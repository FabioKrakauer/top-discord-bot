const Discord = require("discord.js");
const client = new Discord.Client();

require("dotenv").config();

client.on('ready', () => {
    console.log(`Bot iniciado como: ${client.user.tag}!`);
    client.user.setActivity("BOT DA TOP LINHAS AÉREAS");
});

client.on('message', async msg => {
   if(msg.author.bot) return;
   msg.author.send('Id do chat: ' + msg.channel.id + " nome: " + msg.channel.name);
   const channel = client.channels.cache.find(channel => channel.id == "730772596110393346");
   channel.send("Nova atualizacao da changelog");
});
client.login(process.env.DISCORD_TOKEN);