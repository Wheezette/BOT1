var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on('ready', () => {
    console.log(`The bot has been turned on! His name is ${bot.user.tag}. Prefix: "cb!". I jest na ${bot.guilds.size} serwerach!`);
    bot.user.setStatus(`dnd`);
    bot.user.setActivity(`By Ays#1337`, {type: "WATCHING"});
});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = "!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let msg = message.content.startsWith;
    let args = messageArray.slice(1);

    if(cmd === `${prefix}test`){
        message.channel.send("test");
    }
});

//let everyone = message.guild.roles.find(`name`, "@everyone");
//if(args[0] == 'lock') return message.channel.overwritePermissions(everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false }), message.channel.send(`${bot.emojis.find(`name`, 'success')} Okay, according to your wishes, I blocked this channel! Others can not write here.`);

bot.login(process.env.TOKEN);
