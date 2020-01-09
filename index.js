var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on('ready', () => {
    console.log(`The bot has been turned on! His name is ${bot.user.tag}. Prefix: "cb!". I jest na ${bot.guilds.size} serwerach!`);
    bot.user.setStatus(`dnd`);
    bot.user.setActivity(`By Ays#1337`, {type: "WATCHING"});
});

bot.on("ready", e => {
	setInterval (function (){
	  var statusrand  = Math.floor(Math.random() * 8 + 1);
	  if (statusrand === 1) {
		bot.guilds.get("659851129370312731").channels.get("661913427987660813").fetchMessage('661915136084410429').then(message => message.edit("```Administracja Lost Castle - wraz ze statusem```\n**Główny Właściciel:**\n" + `${bot.guilds.get("659851129370312731").roles.get('663095837307437084').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**WspółWłaściciele:**\n${bot.guilds.get("659851129370312731").roles.get('663095899689451530').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Creative:**\n${bot.guilds.get("659851129370312731").roles.get('663528542860214277').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Survival:**\n${bot.guilds.get("659851129370312731").roles.get('663528576875757568').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa BedWars:**\n${bot.guilds.get("659851129370312731").roles.get('663528604281339906').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n*dnd* - nie przeszkadzać\n*idle* - zaraz wracam\n*online* - dostępny\n*offline* - niewidoczny\n\n**Wygenerowano przez ${bot.user.tag}.**`));
		//bot.channels.get("490431842424717322").setName(moment.utc(message.createdAt).format('HH:mm:ss'));
		console.log(statusrand);
	  }
	  if (statusrand === 2) {
		bot.guilds.get("659851129370312731").channels.get("661913427987660813").fetchMessage('661915136084410429').then(message => message.edit("```Administracja Lost Castle - wraz ze statusem```\n**Główny Właściciel:**\n" + `${bot.guilds.get("659851129370312731").roles.get('663095837307437084').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**WspółWłaściciele:**\n${bot.guilds.get("659851129370312731").roles.get('663095899689451530').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Creative:**\n${bot.guilds.get("659851129370312731").roles.get('663528542860214277').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Survival:**\n${bot.guilds.get("659851129370312731").roles.get('663528576875757568').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa BedWars:**\n${bot.guilds.get("659851129370312731").roles.get('663528604281339906').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n*dnd* - nie przeszkadzać\n*idle* - zaraz wracam\n*online* - dostępny\n*offline* - niewidoczny\n\n**Wygenerowano przez ${bot.user.tag}.**`));
		console.log(statusrand);
	  }
	  if (statusrand === 3) {
		bot.guilds.get("659851129370312731").channels.get("661913427987660813").fetchMessage('661915136084410429').then(message => message.edit("```Administracja Lost Castle - wraz ze statusem```\n**Główny Właściciel:**\n" + `${bot.guilds.get("659851129370312731").roles.get('663095837307437084').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**WspółWłaściciele:**\n${bot.guilds.get("659851129370312731").roles.get('663095899689451530').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Creative:**\n${bot.guilds.get("659851129370312731").roles.get('663528542860214277').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Survival:**\n${bot.guilds.get("659851129370312731").roles.get('663528576875757568').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa BedWars:**\n${bot.guilds.get("659851129370312731").roles.get('663528604281339906').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n*dnd* - nie przeszkadzać\n*idle* - zaraz wracam\n*online* - dostępny\n*offline* - niewidoczny\n\n**Wygenerowano przez ${bot.user.tag}.**`));
		console.log(statusrand);
	  }
	  if (statusrand === 4) {
		bot.guilds.get("659851129370312731").channels.get("661913427987660813").fetchMessage('661915136084410429').then(message => message.edit("```Administracja Lost Castle - wraz ze statusem```\n**Główny Właściciel:**\n" + `${bot.guilds.get("659851129370312731").roles.get('663095837307437084').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**WspółWłaściciele:**\n${bot.guilds.get("659851129370312731").roles.get('663095899689451530').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Creative:**\n${bot.guilds.get("659851129370312731").roles.get('663528542860214277').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Survival:**\n${bot.guilds.get("659851129370312731").roles.get('663528576875757568').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa BedWars:**\n${bot.guilds.get("659851129370312731").roles.get('663528604281339906').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n*dnd* - nie przeszkadzać\n*idle* - zaraz wracam\n*online* - dostępny\n*offline* - niewidoczny\n\n**Wygenerowano przez ${bot.user.tag}.**`));
		console.log(statusrand);
	  }
	  if (statusrand === 5) {
		bot.guilds.get("659851129370312731").channels.get("661913427987660813").fetchMessage('661915136084410429').then(message => message.edit("```Administracja Lost Castle - wraz ze statusem```\n**Główny Właściciel:**\n" + `${bot.guilds.get("659851129370312731").roles.get('663095837307437084').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**WspółWłaściciele:**\n${bot.guilds.get("659851129370312731").roles.get('663095899689451530').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Creative:**\n${bot.guilds.get("659851129370312731").roles.get('663528542860214277').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Survival:**\n${bot.guilds.get("659851129370312731").roles.get('663528576875757568').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa BedWars:**\n${bot.guilds.get("659851129370312731").roles.get('663528604281339906').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n*dnd* - nie przeszkadzać\n*idle* - zaraz wracam\n*online* - dostępny\n*offline* - niewidoczny\n\n**Wygenerowano przez ${bot.user.tag}.**`));
		console.log(statusrand);
	  }
	  if (statusrand === 6) {
		bot.guilds.get("659851129370312731").channels.get("661913427987660813").fetchMessage('661915136084410429').then(message => message.edit("```Administracja Lost Castle - wraz ze statusem```\n**Główny Właściciel:**\n" + `${bot.guilds.get("659851129370312731").roles.get('663095837307437084').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**WspółWłaściciele:**\n${bot.guilds.get("659851129370312731").roles.get('663095899689451530').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Creative:**\n${bot.guilds.get("659851129370312731").roles.get('663528542860214277').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Survival:**\n${bot.guilds.get("659851129370312731").roles.get('663528576875757568').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa BedWars:**\n${bot.guilds.get("659851129370312731").roles.get('663528604281339906').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n*dnd* - nie przeszkadzać\n*idle* - zaraz wracam\n*online* - dostępny\n*offline* - niewidoczny\n\n**Wygenerowano przez ${bot.user.tag}.**`));
		console.log(statusrand);
	  }
	  if (statusrand === 7) {
		bot.guilds.get("659851129370312731").channels.get("661913427987660813").fetchMessage('661915136084410429').then(message => message.edit("```Administracja Lost Castle - wraz ze statusem```\n**Główny Właściciel:**\n" + `${bot.guilds.get("659851129370312731").roles.get('663095837307437084').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**WspółWłaściciele:**\n${bot.guilds.get("659851129370312731").roles.get('663095899689451530').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Creative:**\n${bot.guilds.get("659851129370312731").roles.get('663528542860214277').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Survival:**\n${bot.guilds.get("659851129370312731").roles.get('663528576875757568').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa BedWars:**\n${bot.guilds.get("659851129370312731").roles.get('663528604281339906').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n*dnd* - nie przeszkadzać\n*idle* - zaraz wracam\n*online* - dostępny\n*offline* - niewidoczny\n\n**Wygenerowano przez ${bot.user.tag}.**`));
		console.log(statusrand);
	  }
	  if (statusrand === 8) {
		bot.guilds.get("659851129370312731").channels.get("661913427987660813").fetchMessage('661915136084410429').then(message => message.edit("```Administracja Lost Castle - wraz ze statusem```\n**Główny Właściciel:**\n" + `${bot.guilds.get("659851129370312731").roles.get('663095837307437084').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**WspółWłaściciele:**\n${bot.guilds.get("659851129370312731").roles.get('663095899689451530').members.map(m=> `${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Creative:**\n${bot.guilds.get("659851129370312731").roles.get('663528542860214277').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa Survival:**\n${bot.guilds.get("659851129370312731").roles.get('663528576875757568').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n**Ekipa BedWars:**\n${bot.guilds.get("659851129370312731").roles.get('663528604281339906').members.map(m=> `(${m.highestRole.name}) ${m.user.tag} (${m.user.presence.status})`).join('\n')}\n\n*dnd* - nie przeszkadzać\n*idle* - zaraz wracam\n*online* - dostępny\n*offline* - niewidoczny\n\n**Wygenerowano przez ${bot.user.tag}.**`));
		console.log(statusrand);
	  }

	}, 2000);
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
