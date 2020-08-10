const Discord = require("discord.js");
const client = new Discord.Client();

require("dotenv").config();

const router = require("./router");
client.on('ready', () => {
    console.log(`Bot iniciado como: ${client.user.tag}!`);
    client.user.setActivity("BOT DA TOP LINHAS AÉREAS");
});

client.on('message', async msg => {
   if(msg.author.bot) return;
   console.log(router.execute_command(msg.content));
});
client.login(process.env.DISCORD_TOKEN);