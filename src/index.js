const Discord = require("discord.js");
const client = new Discord.Client();

require("dotenv").config();

const router = require("./router");
const utils = require("./utils");
const changelog = require("./Commands/changelog");
client.on('ready', () => {
    console.log(`Bot iniciado como: ${client.user.tag}!`);
    client.user.setActivity("BOT DA TOP LINHAS AÉREAS");
});

client.on('message', async msg => {
   if(msg.author.bot) return;
   if(msg.channel.type == "dm") return;
   if(msg.content.startsWith("/top")){
        router.execute_command(client, msg);
   }

   
});
client.login(process.env.DISCORD_TOKEN);