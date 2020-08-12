const Discord = require("discord.js");
const client = new Discord.Client();

require("dotenv").config();

const router = require("./router");

client.on('ready', async () => {
    console.log(`Bot iniciado como: ${client.user.tag}!`);
    client.user.setActivity("BOT DA TOP LINHAS AÉREAS");

});

client.on('message', async msg => {
   if(msg.author.bot) return;
   if(msg.channel.type == "dm") return;
   if(msg.content.startsWith(process.env.COMMAND_PREFIX)){
        router.execute_command(client, msg);
   }

   
});
client.login(process.env.DISCORD_TOKEN);