var Discord = require("discord.js");
var bot = new Discord.Client();
var konfiguracja = require("./konfiguracja.json");
const ascii = require("ascii-art");
const moment = require("moment");
const fs = require("fs");
const ms = require("ms");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

bot.on('ready', () => {
    console.log(`The bot has been turned on! His name is ${bot.user.tag}. Prefix: "cb!". I jest na ${bot.guilds.size} serwerach!`);
    bot.user.setStatus(`dnd`);
    bot.user.setActivity(`Zresetowano prefix na "!" | ${bot.guilds.size} serwerów.`, {type: "WATCHING"});
});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: konfiguracja.prefix
        };
    }

    let suggestChannels = JSON.parse(fs.readFileSync("./suggestChannels.json", "utf8"));

    if(!suggestChannels[message.guild.id]){
        suggestChannels[message.guild.id] = {
            suggestChannels: konfiguracja.defaultSuggestChannel
        };
    }

    let suggestChannel = suggestChannels[message.guild.id].suggestChannels;

    let prefix = prefixes[message.guild.id].prefixes;
    //let prefix = konfiguracja.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let msg = message.content.startsWith;
    let args = messageArray.slice(1);

    if(cmd === `${prefix}bingo`){
        let y = Math.floor(Math.random() * (Math.floor(75) - Math.ceil(1) + 1)) + Math.ceil(1);
        let x = null;

        if (y < 15) { x = "B"; } 
        else if (y < 30){ x = "I"; } 
        else if (y < 45){ x = "N"; } 
        else if (y < 60){ x = "G"; } 
        else { x = "O"; }

        message.channel.send(x + y);
    }
    
    if(cmd === `${prefix}statsrefresh`){
        bot.channels.get("478297357046382592").setName(`✸ Użytkownicy: ${message.guild.memberCount}`);
        bot.channels.get("478297464810635279").setName(`✸ Botów: ${message.guild.members.filter(m => m.user.bot).size}`);
    }

    if(cmd === `${prefix}kill`){
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        message.channel.send(`${bot.emojis.find(`name`, 'alert')} **${aUser.tag}** został(a) zabity(a) przez **${message.author.tag}**!`).then(Message => {
            setTimeout(() => { Message.edit(`${bot.emojis.find(`name`, 'alert')} Odradzanie...`); }, 1000);
            setTimeout(() => { Message.edit(`${bot.emojis.find(`name`, 'alert')} Użtlownik narodził się znów. Witamy ponownie, ${aUser.tag}`); }, 1000);
        });
    }

    if(cmd === `${prefix}votekick`){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz uprawnień do tej komendy. Musisz mieć uprawnienie `KICK_MEMBERS`, aby tego użyć.");
        const agree    = "✅";
        const disagree = "❎";

        if (message.mentions.users.size === 0){
            return message.channel.send(`${bot.emojis.find(`name`, 'error')} ` + "Popraw użytkownika, iż nie wpisałeś go poprawie.");
        }
        
        let kickmember = message.guild.member(message.mentions.users.first());

        if(!kickmember){
            message.channel.send(`${bot.emojis.find(`name`, 'error')} ` + "Wybrany użytkownik nie istnieje!");
        }
        
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
            return message.reply(`${bot.emojis.find(`name`, 'error')} ` + "Ej?! Dodaj mi uprawnienia `KICK_MEMBERS`, bo inaczej komenda nie zadziała!").catch(console.error);
        }
        
        let msg = await message.channel.send(`${bot.emojis.find(`name`, 'alert')} Głosowanie o wyrzucenie użytkownika **${kickmember}** z serwera, aby zagłosować kliknij w odpowiednią reakcję. (10 sek.)`);
        
        await msg.react(agree);
        await msg.react(disagree);
        
        const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000});
        
        msg.delete();
        
        var NO_Count = reactions.get(disagree).count;
        var YES_Count = reactions.get(agree);

        if(YES_Count == undefined){
            var YES_Count = 1;
        }else{
            var YES_Count = reactions.get(agree).count;
        }
        
        var sumsum = new Discord.RichEmbed()
        .addField("Głosowanie zakończone, oto wyniki:", `~~----------------------------------------~~\n${bot.emojis.find(`name`, 'error')} Głosy na nie: ${NO_Count-1}\n${bot.emojis.find(`name`, 'success')} Głosy na tak: ${YES_Count-1}\nNOTE: Wymagane głosy na wyrzucenie (3+)\n~~----------------------------------------~~`)
        .setColor("RANDOM")
        
        await message.channel.send(sumsum);
        
        if(YES_Count >= 4 && YES_Count > NO_Count){
        
            kickmember.kick().then(member => {
                message.reply(`${bot.emojis.find(`name`, 'success')} ${member.user.username} został(a) poprawnie wyrzucony(a).`)
        })
        
        }else{
        
        message.channel.send("\n" + `${bot.emojis.find(`name`, 'error')} Użytkownik nie zosał wyrzucony!**Być może bot ma za niskie permisje, aby go wyrzucić!**`);
        
        }
    }

    if(cmd === `${prefix}say`){
        //message.delete();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz do tego uprawnień. Musisz mieć uprawnienie `MANAGE_MESSAGES`, aby użyć tej komendy.")
        if (args[0].includes('@everyone')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Co ty chcesz zrobić? Napewno wszystkich nie oznaczysz, nie ma opcji.`);
        if (args[0].includes('@here')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Co ty chcesz zrobić? Napewno wszystkich nie oznaczysz, nie ma opcji.`);
        let sayMessage = args.join(" ");
        message.delete();
        message.channel.send(sayMessage);
    }

    if(cmd === `<@458569537286176768>`){
        message.channel.send(`${bot.emojis.find(`name`, 'question')} Słucham, o co chodzi? Mój prefix to: ` + "`" + `${prefix}` + "`");
        let cmdlogs = message.guild.channels.find(`id`, "471972734851612672");
        cmdlogs.send(`${bot.emojis.find(`name`, 'alert')} Użytkownik **${message.author.tag}**(**${message.author.id}**) oznaczył bota na serwerze **${message.guild.name}**(**${message.guild.id}**).`);
    }
    
    if(cmd === `${prefix}ascii`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        ascii.font(args.join(' '), 'Doom', function(rendered) {
          rendered = rendered.trimRight();
    
          if(rendered.length > 2000) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Wooo.. Ta wiadomość jest za długa i nie dam jej do ascii!`);
          message.channel.send(rendered, {
            code: 'md'
          });
        })
        let cmdlogs = message.guild.channels.find(`id`, "471972734851612672");
        cmdlogs.send(`${bot.emojis.find(`name`, 'alert')} Użytkownik **${message.author.tag}**(**${message.author.id}**) użył komendy **ascii** na serwerze **${message.guild.name}**(**${message.guild.id}**) server.`);
    }

    if(cmd === `${prefix}roles`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        const rolesList = message.guild.roles.map(e=>e.toString()).join(", ");
        const rolesEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("List of roles:", rolesList)
        message.channel.send(rolesEmbed);
        let cmdlogs = message.guild.channels.find(`id`, "471972734851612672");
        cmdlogs.send(`${bot.emojis.find(`name`, 'alert')} Użytkownik **${message.author.tag}**(**${message.author.id}**) użył komendy **roles** na serwerze **${message.guild.name}**(**${message.guild.id}**) server.`);
    }

    //if (!userData[sender.id]) userData[sender.id] = {
        //messagesSent: 0
    //}

   //userData[sender.id].messagesSent++;

    //fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        //if (err) console.error(err);
    //});

    //if (cmd === `${prefix}points`) {
        //var embed = new Discord.RichEmbed()
        //.setColor("RANDOM")
        //.setDescription(`${bot.emojis.find(`name`, 'alert')} You currently have **` + userData[sender.id].messagesSent + `** points on this server!`)
        //.setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Used by ${message.author.tag}.`);
        //message.channel.send(embed);
    //}

    if(cmd === `${prefix}profile`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author;
        const userinfo = new Discord.RichEmbed()
        .setColor("FFA07A")
        .setAuthor(`Profil ${aUser.username}`, `https://cdn.discordapp.com/emojis/472480341299298304.png?v=1`)
        .setThumbnail(aUser.displayAvatarURL)
        .addField("ID:", `${aUser.id}`)
        .addField("Pseudonim:", `${aUser.nickname ? aUser.nickname : "Brak"}`)
        .addField("Konto utworzone:", `${moment.utc(aUser.createdAt).format('dd, Do MM YYYY')}`)
        .addField("Dołączył(a) do serwea:", `${moment.utc(aUser.joinedAt).format('dd, Do MM YYYY')}`)
        .addField("Jest botem:", `${aUser.bot}`)
        .addField("Status:", `${aUser.presence.status.replace("dnd", "Do Not Disturb")}`)
        .addField("Gra:", `${aUser.presence.game ? aUser.presence.game.name : 'Żadna'}`)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto przez ${message.author.tag}.`)
        message.channel.send(userinfo);
    }

    if(cmd === `${prefix}server` || cmd === `${prefix}server-info` || cmd === `${prefix}serverinfo`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);

        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setColor("FFA07A")
        .setAuthor(`${message.guild.name}`, `https://cdn.discordapp.com/emojis/473897310414176266.png?v=1`)
        .setThumbnail(sicon)
        //.addField("Name:", message.guild.name)
        .addField("Utworzony:", `${moment.utc(message.guild.createdAt).format('dd, Do MM YYYY')}`)
        .addField("Dołączyłeś(aś):",`${moment.utc(message.author.joinedAt).format('dd, Do MM YYYY')}`)
        .addField("Liczba użytkowników:", message.guild.memberCount)
        .addField("Region:", `${message.guild.region.replace("eu-central", ":flag_eu: EU Central")}`)
        .addField("Kanały tekstowe:", message.guild.channels.findAll("type", "text").length)
        .addField("Kanały głosowe:", message.guild.channels.findAll("type", "voice").length)
        .addField("Role:", `${message.guild.roles.size} (Full list of roles under the **${prefix}roles** command.)`)
        .addField("Emotki:", message.guild.emojis.size)
        .addField("Właściciel(ka):", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Used by ${message.author.tag}.`);
    
        message.channel.send(serverembed);
    }

    if(cmd === `${prefix}channel`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie możesz tego użyć. Musisz mieć uprawnienie `MANAGE_CHANNELS`, aby użyć tej komendy.");
        let channelname = args.slice(1).join(" ");
        let everyone = message.guild.roles.find(`name`, "@everyone");
        if(args[0] == 'lock') return message.channel.overwritePermissions(everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false }), message.channel.send(`${bot.emojis.find(`name`, 'success')} Tak jest! Kanał został zablokowany, inni użytkownicy już tu nie będą pisać!`);
        if(args[0] == 'unlock') return message.channel.overwritePermissions(everyone, { SEND_MESSAGES: true, ADD_REACTIONS: true }), message.channel.send(`${bot.emojis.find(`name`, 'success')} Tak jest! Kanał został ponownie odblokowany, inni użytkownicy znów mogą pisać!`);
        if(args[0] == 'setname') return message.channel.edit({ name: `${channelname}` }), message.channel.send(`${bot.emojis.find(`name`, 'success')} Nazwa kanału została pomyślnie zmieniona na: ${channelname}`);
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Poprawne użycie tego polecenia: ` + "`cb!channel <lock/unlock/setname>`.")
        //if(args[0] == 'setname') return message.channel.setName(channelname), message.channel.send(`${bot.emojis.find(`name`, 'success')} Mmm... You asked for a channel name change. It has been done! The new name of this channel is: **${channelname}**.`);
        let cmdlogs = message.guild.channels.find(`id`, "471972734851612672");
        cmdlogs.send(`${bot.emojis.find(`name`, 'alert')} Użytkownik **${message.author.tag}**(**${message.author.id}**) użył komendy **channel** na serwerze **${message.guild.name}**(**${message.guild.id}**) server.`);
    }

   // if(cmd === `${prefix}webhook`){
      //  let webhookid = args[0].split("/")[5]
      //  let webhooktoken = args[0].split("/")[6]
      //  const hook = new Discord.WebhookClient(webhookid, webhooktoken);
       // if(args[0] == 'create') return message.channel.createWebhook(args.join(" ").split(" | ")[0], args.join(" ").split(" | ")[1])
       // .then(webhook => message.author.send(`${bot.emojis.find(`name`, 'success')} Your webhook has been created! Link to him: https://canary.discordapp.com/api/webhooks/${webhook.id}/${webhook.token}`))
       // .then(webhook => message.channel.send(`${bot.emojis.find(`name`, 'success')} Oh yes! Webhook on this server was created! See private messages for more information!`))
        //.catch(console.error);
        //if(args[0] == 'send') return hook.send(args.join(" ").slice(args[0].length));
        //if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')}` + " Oh no! An error occurred, did not you give the action? The correct usage is: `cb!webhook <create>`.");
    //}


    //fs.writeFile('Storage/suggestChannel.json', JSON.stringify(suggestChannel), (err) => {
        //if (err) console.error(err);
    //})

    if(cmd === `${prefix}eval`){
        //if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(message.author.id !== '396284197389729793', '358901906170445835') return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz dostępu do tego polecenia. Musisz posiadać uprawnienia `developer` w bocie, sprawdz jakie masz poprzez `cb!permissions`.")
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')}` + " Proszę, abyś podał(a) kod, który chcesz evalować. Jeśli nie wiesz o co chodzi, wpisz `cb!help eval`.")
        let result = eval(args.join(" ")).toString()
          let embed = new Discord.RichEmbed()
          //.setTitle("Eval")
          .addField(`${bot.emojis.find(`name`, 'jsonfile')} Wejście`, "```"+args.join(" ")+"```")
          .addField(`${bot.emojis.find(`name`, 'txt')} Wyjście`, "```"+result+"```")
          .setColor("RANDOM")
          .setFooter(`Kod evalował(a) ${message.author.tag}`, `https://cdn.discordapp.com/emojis/472480341299298304.png?v=1`)
          message.channel.send(embed);
    }

    if(message.author.id === "396284197389729793"){
        if(cmd === `${prefix}botsetname`){
          let nowaNazwa = args.join(" ");
          bot.user.setUsername(nowaNazwa);
          console.log(`Nick został zmieniony.`);
          message.channel.send(`${bot.emojis.find(`name`, 'success')} Nazwa bota została zmieniona na: **${nowaNazwa}**.`);
        }
        //let cmdlogs = message.guild.channels.find(`id`, "471972734851612672");
        //cmdlogs.send(`${bot.emojis.find(`name`, 'alert')} The **${message.author.tag}**(**${message.author.id}**) user has used the **botsetname** command on the **${message.guild.name}**(**${message.guild.id}**) server.`);
    }

    if(message.author.id === "396284197389729793"){
        if(cmd === `${prefix}botsetavatar`){
          let nowyAvatar = args.join(" ");
          bot.user.setAvatar(nowyAvatar);
          console.log(`Avatar został zmieniony.`);
          message.channel.send(`${bot.emojis.find(`name`, 'success')} Avatar bota został zmieniony na: **${nowyAvatar}**.`);
        }
        //let cmdlogs = message.guild.channels.find(`id`, "471972734851612672");
        //cmdlogs.send(`${bot.emojis.find(`name`, 'alert')} The **${message.author.tag}**(**${message.author.id}**) user has used the **botsetavatar** command on the **${message.guild.name}**(**${message.guild.id}**) server.`);
    }

    if(cmd === `${prefix}help`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        const helpmsg = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Moje polecenia')
        .setDescription("Moje komendy są naprawde super, znajdziesz je poniżej!")
        .addField('Basic (3):', '`invite`, ~~`info`~~, `help`, `permissions`')
        .addField('Fun (9):', '`ascii`, `reverse`, `choose`, `avatar`, `hug`, `8ball`, `wheel`, `bingo`, `say`, `hug`')
        .addField('Administrative (9):', '`ban`, ~~`kick`~~, `votekick`, `survey`, `addrole`, `removerole`, `channel`, `setprefix`, `setSuggestChannel`, `clear`')
        .addField('Images (1):', '`cat`')
        .addField('Information (2):', '`server`, `profile`')
        .addField('Other (1):', '`propozycja`')
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto przez ${message.author.tag}.`)
        if(!args[0]) return message.channel.send(helpmsg);
        if(args[0] == 'invite') return message.channel.send('Help with the **INVITE** command. \n```Usage: ' + `${prefix}invite` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'info') return message.channel.send('Help with the **INFO** command. \n```Usage: ' + `${prefix}info` + '``` \n**Aliases:** None \n**Description:** It will display information about the bot.');
        if(args[0] == 'help') return message.channel.send('Help with the **HELP** command. \n```Usage: ' + `${prefix}help` + '``` \n**Aliases:** None \n**Description:** Shows a list of bot commands.');
        if(args[0] == 'serverlist') return message.channel.send('Help with the **SERVERLIST** command. \n~~```Usage: ' + `${prefix}serverlist` + '```~~ \n~~**Aliases:** None \n**Description:** Displays a list of servers on which the bot is located.~~ ' + `\n${bot.emojis.find(`name`, 'alert')} ***__COMMAND DISABLED__*** ${bot.emojis.find(`name`, 'alert')}`);
        if(args[0] == 'permissions') return message.channel.send('Help with the **PERMISSIONS** command. \n```Usage: ' + `${prefix}permissions` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'ascii') return message.channel.send('Help with the **ASCII** command. \n```Usage: ' + `${prefix}ascii <text>` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'reverse') return message.channel.send('Help with the **REVERSE** command. \n```Usage: ' + `${prefix}reverse <text>` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'choose') return message.channel.send('Help with the **CHOOSE** command. \n```Usage: ' + `${prefix}choose <text1>;<text2>` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'avatar') return message.channel.send('Help with the **AVATAR** command. \n```Usage: ' + `${prefix}avatar [<@user>]` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
        if(args[0] == 'hug') return message.channel.send('Help with the **HUG** command. \n```Usage: ' + `${prefix}hug <@user>` + '``` \n**Aliases:** None \n**Description:** After entering this command you will see a link to the help server with the bot and a link to invite it to your server!');
    }

    if(cmd === `${prefix}news`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let newsEmbed = new Discord.RichEmbed()
        .setColor('42f4ee')
        .setTitle('Informacja od Administracji BOTa')
        .setDescription(`Zmieniono prefix bota na **!**, cały czas pracujemy nad jego błędami! Bot może być dzisiaj niedostępny kilka razy przez całkowite przepisywanie komend.`)
        .setFooter('Wysłano przez Blackuu#8732')
        message.channel.send(newsEmbed);
    }

    if(cmd === `${prefix}ban`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send(":x: Podaj poprawnego użytkownika, musi to być mention.");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(":lock: Nie masz uprawnień do korzystania z tej komendy, jeszcze brakuje Ci `MANAGE_MEMBERS`.");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":lock: Nie możesz go/jej zbanować.");
        if(!args[0]) return message.channel.send(`Ehh... Nie podałeś(aś) powodu bana, niestety, ale musisz go podać.`);
    
        let banEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`[BAN] ${bUser.tag}`, `${bUser.displayAvatarURL}`)
        .addField("Moderator:", `<@${message.author.id}>, id ${message.author.id}`)
        .addField("Kanał:", message.channel)
        .addField("Powód:", bReason)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto na ${message.guild.name}.`)
        //.setAuthor(`${bUser.user.tag}, ${bUser.id}`, `${bUser.user.displayAvatarURL}`);
    
        let modlogi = message.guild.channels.find(`name`, "modlogs");
        if(!modlogi) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Kanał "**modlogi**" nie istnieje, ale to nic nie szkodzi. Użytkownik **${bUser}** został zbanowany(a)`), message.guild.member(bUser).ban(bReason);
        
        message.channel.send(`${bot.emojis.find(`name`, 'success')} Użytkownik ${bUser} został zbanowany za ${bReason}.`)
        message.guild.member(bUser).ban(bReason);
        modlogi.send(banEmbed);
    
        //let logiKomend = bot.channels.get("458569305341296641");
        //logiKomend.send(`Użytkownik: **${message.author.tag}** (**${message.author.id}**) \nUżył komendy **ban** na serwerze **${message.guild.name}**, zbanował **${bUser}** za **${bReason}**.`);
        return;
    }

    if(cmd === `${prefix}invite`){
        message.channel.send(`${bot.emojis.find(`name`, 'plus')} Aby zaprosić bota na swój serwer: https://discordapp.com/api/oauth2/authorize?client_id=458569537286176768&permissions=8&scope=bot \n \n${bot.emojis.find(`name`, 'plus')} Jeśli potrzebujesz pomocy, wejdź na serwer pomocy: https://discord.gg/3F7wGx8`);
    }

    if(cmd === `${prefix}serverlist9929319238109310901931039010930190391903`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        const guildArray = bot.guilds.map((guild) => {
          return `${guild.name}`
        })
      
        let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("A full list of servers on which the bot is:", guildArray.join(", "))
        .setFooter(`There are ${bot.guilds.size} servers in total.`, 'https://cdn.discordapp.com/emojis/472688143389425665.png?v=1')
        
        message.channel.send(embed);
      
    }

    if(cmd === `${prefix}serverlist`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        message.channel.send(`${bot.emojis.find(`name`, 'alert')} ***__Komenda wyłączona__*** ${bot.emojis.find(`name`, 'alert')}`);
    }

    if(cmd === `${prefix}permissions`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if (message.author.id === '396284197389729793','358901906170445835') return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień to: `Twórca CookieBOT` (5)");
        if (message.author.id === '372026600989917195') return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień to: `Globalny Support` (4)")
        //if (message.guild.owner) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Your permission level is: `Server Owner` (3)");
        if (message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień to: `Administrator Serwera` (2)");
        //if (message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Your permission level is: `Manage Server` (1)");

        message.channel.send(`${bot.emojis.find(`name`, 'pass')}` + " Twój poziom uprawnień to: `Użytkownik` (0)");
    }

    if(cmd === `${prefix}removerole`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz wymaganych uprawnień. Musisz mieć dodatkowo uprawnienie `MANAGE_MEMBERS`, inaczej komenda nie zadziała.");
        let rMember = message.guild.member(message.mentions.users.first()) ||  message.guild.members.get(args[0]);
        if(!rMember) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Podaj poprawnego użytkownika!`);
        let role = args.join(" ").slice(22);
        if(!role) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Musisz podać rolę do nadania, nie może to być wzmianka!`);
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Wybrana rola nie istnieje.`);

        if(!rMember.roles.has(gRole.id)) return message.reply('On nie ma tej roli.');
        await(rMember.removeRole(gRole.id));

        try{
            await rMember.send(`${bot.emojis.find(`name`, 'alert')} Straciłeś(aś) rolę **${gRole.name}** na serwerze **${message.guild.name}**!`)
            await message.channel.send(`${bot.emojis.find(`name`, 'success')} Usunąłeś(aś) rolę **${gRole.name}** dla użytkownika **<@${rMember.id}>**!`);
        }catch(error){
            console.log(error);
        }
    }

    if(cmd === `${prefix}addrole`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz wymaganych uprawnień. Musisz mieć dodatkowo uprawnienie `MANAGE_MEMBERS`, inaczej komenda nie zadziała.");
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Musisz podać poprawnego użytkownika!`);
        let role = args.join(" ").slice(22);
        //message.channel.send(`${bot.emojis.find(`name`, 'error')} You must provide a role (give its name, it can not be a mention)`);
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Wybrana rola nie istnieje!.`);

        if(rMember.roles.has(gRole.id)) return;
        await(rMember.addRole(gRole.id));

        try{
            rMember.send(`${bot.emojis.find(`name`, 'alert')} Otrzymałeś(aś) rolę **${gRole.name}** na serwerze **${message.guild.name}**!`)
            message.channel.send(`${bot.emojis.find(`name`, 'success')} Nadałeś(aś) rolę **${gRole.name}** dla użytkownika **<@${rMember.id}>**!`)
        }catch(error){
            console.log(error);
        }
    }

    if(cmd === `${prefix}avatar`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        let avEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        //.setDescription(`Avatar ${aUser.username}:`)
        //.setThumbnail(aUser.displayAvatarURL)
        .setDescription(`${bot.emojis.find(`name`, 'user')} Avatar ${aUser.username}:`)
        .setImage(aUser.displayAvatarURL)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Użyto przez ${message.author.tag}.`);
        message.channel.send(avEmbed);
        return;
    }

    if(cmd === `${prefix}hug`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author || message.user.id;
        let huglinks = ["https://media.giphy.com/media/l0HlOvJ7yaacpuSas/giphy.gif", "https://media.giphy.com/media/xT39CXg70nNS0MFNLy/giphy.gif", "https://media.giphy.com/media/143v0Z4767T15e/giphy.gif", "https://media.giphy.com/media/BVRoqYseaRdn2/giphy.gif", "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif"];
        let math = Math.floor((Math.random() * huglinks.length));
        let hugEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Użytkownik ${message.author.tag} przytulił(a) ${aUser.tag}.`, 'https://cdn.discordapp.com/emojis/472468044871106591.png?v=1')
        .setImage(huglinks[math])

        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Kogo chcesz przytulić?`);
        message.channel.send(hugEmbed);
    }

    if(cmd === `${prefix}survey` || cmd === `${prefix}vote`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":lock: You do not have sufficient permissions to create a survey.");
        const ankietaMessage = args.join(" ");
        //let ankieta = await message.channel.send(ankietaEmbed);
        let ankietaEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Nowa ankieta`, `https://cdn.discordapp.com/emojis/472694503229358080.png?v=1`)
        .setDescription(ankietaMessage)
        .setFooter(`Ankieta stworzona przez ${message.author.tag}`);
    
        let ankieta = await message.channel.send(ankietaEmbed);
        ankieta.react(bot.emojis.find(`name`, 'success'));
        ankieta.react(bot.emojis.find(`name`, 'error'));
        message.delete();
        return;
    }

    if(cmd === `${prefix}reverse`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!args[0]) return message.channel.send(':x: Musisz podać tekst do odwrócenia!');
        if (args[0].includes('enoyreve@')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Eh.. Nie oznaczysz wszystkich przez tą komendę.`);
        if (args[0].includes('ereh@')) return message.channel.send(`${bot.emojis.find(`name`, 'alert')} Eh.. Nie oznaczysz wszystkich przez tą komendę.`);
    
        function reverseString(str) {
            return str.split("").reverse().join("");
        }
        let sreverse = reverseString(args.join(' '))
        //if(sreverse === '@here' || sreverse === '@everyone' || sreverse === `https://discord.gg/${invite.code}`) return message.channel.send("Nie możesz tego odwrócić!")
        if(args[0] === sreverse) {
        sreverse = `${args.join(' ')} [wyszło na to samo ;(]`
        }
        message.channel.send(`${bot.emojis.find(`name`, 'repeat')} Odwrócony tekst: **${sreverse}**`);
    }

    if(cmd === `${prefix}cat`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let catlinks = ["https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif", "https://media.giphy.com/media/l1J3pT7PfLgSRMnFC/giphy.gif", "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif", "https://media.giphy.com/media/6uMqzcbWRhoT6/giphy.gif", "https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif", "https://media.giphy.com/media/11s7Ke7jcNxCHS/giphy.gif", "https://media.giphy.com/media/Nm8ZPAGOwZUQM/giphy.gif", "https://media.giphy.com/media/Q56ZI04r6CakM/giphy.gif"];
        let math = Math.floor((Math.random() * catlinks.length));
        let catEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(`${bot.emojis.find(`name`, 'cat')} Randomowy kot`, `Tu jest jeden z moich kotków:`)
        .setImage(catlinks[math])
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | ${message.author.tag}`);
    
        message.channel.send(catEmbed);
    }

    if(cmd === `${prefix}wheel`){
        let arrows = [":arrow_up:", ":arrow_down:", ":arrow_left:", ":arrow_down:"]
        let math = Math.floor((Math.random() * arrows.length));
        const embed = new Discord.RichEmbed()
        .setDescription(`:cookie:    :banana:     :peach:\n \n:ice_cream:    ${arrows[math]}   :tomato:\n \n:tangerine:     :cherries:     :grapes:`)
        message.channel.send(embed);
    }

    if(cmd === `${prefix}8ball`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        //if(!args[2]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Please, give me the full question!`);
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Ahh... You did not give a question, can I know why?`);
        let replies = ["Tak, oczywiście.", "Przepraszam, ale nie.", "Skąd mam to wiedzieć, lol?", "Możesz zapytać później?", "Mmmmm... NIE."];
    
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");
    
        let ballembed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
        .setColor("RANDOM")
        .setDescription(question)
        //.addField("Pytanie", question)
        .addField("Odpowiedź:", replies[result])
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | ${message.author.tag}`);
    
        message.channel.send(ballembed);
        return;
    }

    if(cmd === `${prefix}profilei23289239829832983`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let aUser = message.mentions.users.first() || message.author;
        const profileEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(`${bot.emojis.find(`name`, 'user')} ${aUser.username}'s profile`, `Username: ${aUser.username} \nDiscriminator: ${aUser.discriminator} \nGlobal points: 0 \nServer points: 0`)
        message.channel.send(profileEmbed);
    }


    if(cmd === `${prefix}choose`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        var odp = Math.floor(Math.random() *2) + 1
        var a = args.join(" ").split(";")[0]
        var b = args.join(" ").split(";")[1]
        var odp2
        switch(odp) {
          case 1:
          odp2 = a;
          break;
      
          case 2:
          odp2 = b;
        }
        let messagechoose = await message.channel.send(`${bot.emojis.find(`name`, 'thinke')} Hmm...`)
        messagechoose.edit(`${bot.emojis.find(`name`, 'chat')} Okej, wybieram: **${odp2}**`)
    }

    if(cmd === `${prefix}clear`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " AaaAaa... Nie masz uprawnień. Dodatkowo wymagane jest uprawnienie `MANAGE_MESSAGES`, bo inaczej komenda nie zadziała.");
    
        let messagecount = parseInt(args.join(' '));
        message.channel.fetchMessages({
          limit: messagecount
        }).then(messages => message.channel.bulkDelete(messages));
        let purgeSuccessMessage = await message.channel.send(`${bot.emojis.find(`name`, 'success')} Tak jest! Wyczyszczono **${messagecount}** wiadomości z tego kanału!`);
        purgeSuccessMessage.delete(10000);
    }

    if(cmd === `${prefix}ping`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        const m = await message.channel.send("Ping :ping_pong: ");
        m.edit(`:ping_pong: Pong! ${m.createdTimestamp - message.createdTimestamp}ms. API is ${Math.round(bot.ping)}ms`);
    }

    if(cmd === `${prefix}setprefix`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz do tego uprawnień. Aby zmienić konfigurację serwera wymagamy dodatkowo uprawnienia `MANAGE_SERVER`, inaczej komenda nie zadziała.");
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Wystąpił błąd... Nie podałeś(aś) wartości do ustawienia.`);

        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

        prefixes[message.guild.id] = {
            prefixes: args[0]
        }

        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.error(err);
        });

        let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle('ZAPISANO')
        .setDescription(`Prefiks serwera został ustawiony na: ${args[0]}`)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Zmieniono przez ${message.author.tag}.`)

        message.channel.send(sEmbed);
    }

    if(cmd === `${prefix}setSuggestChannel`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " Nie masz do tego uprawnień. Aby zmienić konfigurację musisz dodatkowo miec uprawnienie `MANAGE_SERVER`, inaczej komenda nie zadziała.");
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'lock')} Wystąpił błąd... Czyżbyś nie podał(a) wartości, jaką chcesz ustawić?`);

        let sChannelName = message.guild.channels.find(`name`, args.join(" "));
        if(!sChannelName) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Wybrany kanał nie istnieje. Podaj poprawny, nie może być to wzmianka kanału.`);

        let suggestChannels = JSON.parse(fs.readFileSync("./suggestChannels.json", "utf8"));

        suggestChannels[message.guild.id] = {
            suggestChannels: args[0]
        }

        fs.writeFile("./suggestChannels.json", JSON.stringify(suggestChannels), (err) => {
            if (err) console.error(err);
        });

        let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle('ZAPISANO')
        .setDescription(`Kanał sugestii został ustawiony na: ${args[0]}`)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Zmieniono przez ${message.author.tag}.`)

        message.channel.send(sEmbed);
    }

    if(cmd === `${prefix}settings`){
        if(!args[0]) return message.channel.send("```List of settings for the server: \n[1] prefix \n[2] suggestChannel```" + `If you want to set, enter ` + "`" + `${prefix}settings <->` + "`.")
    }

    if(cmd === `${prefix}suggest` || cmd === `${prefix}propozycja`){
        if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        let suggestContent = args.join(" ");
        if(!args[0]) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Co chcesz zaproponować? Podaj treść propozycji.`)
        const suggestEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(suggestContent)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Propozycja napisana przez ${message.author.tag}.`);
        //message.guild.channels.find(`name`, `${suggestChannel}`).send(suggestEmbed);
        let propozycja = await message.guild.channels.find(`name`, `${suggestChannel}`).send(suggestEmbed);
        propozycja.react(bot.emojis.find(`name`, 'success'));
        propozycja.react(bot.emojis.find(`name`, 'error'));
        message.channel.send(`${bot.emojis.find(`name`, 'success')} Propozycja została wysłana!`)
    }

    if(message.author.id === "396284197389729793"){
        if(cmd === `${prefix}rich`){
          //if(message.author.id !== "396284197389729as93") return message.channel.send("Nie tego!");
        let stream = args.slice(1).join(" ");
        let game = args.slice(1).join(" ");
        let listen = args.slice(1).join(" ");
        let watch = args.slice(1).join(" ");
        let reset = args.slice(1).join(" ");
          if(!args[0]) return message.channel.send(':x: You must provide a value! Correct use: `cb!rich <game/stream/watch/listen> <text>`');
          if(args[0] == 'game') return bot.user.setActivity(game),  message.channel.send(`${bot.emojis.find(`name`, 'alert')} Bot started playing in **${game}**.`);
            //message.channel.send(`:wink: Bot zaczął grać w **${game}**.`);
        //let stream = args.slice(1).join(" ");
          if(args[0] == 'stream') return bot.user.setGame(`${stream}`, 'https://twitch.tv/xcookietm'), message.channel.send(`${bot.emojis.find(`name`, 'alert')} Bot started broadcasting live **${stream}**.`);
            //message.channel.send(`:wink: Bot zaczął nadawać na żywo **${stream}**.`);
          if(args[0] == 'listen') return bot.user.setActivity(`${listen}`, {type: 'LISTENING'}), message.channel.send(`${bot.emojis.find(`name`, 'alert')} Bot started to listen **${listen}**.`);
          if(args[0] == 'watch') return bot.user.setActivity(`${watch}`, {type: 'WATCHING'}), message.channel.send(`${bot.emojis.find(`name`, 'alert')} Bot began to watch **${watch}**.`);
          if(args[0] == 'reset') return bot.user.setActivity(`${reset}`), message.channel.send(`${bot.emojis.find(`name`, 'alert')} The status of the bot has been reset.`);
          if(args[0] == 'servers') return bot.user.setActivity(`${bot.guilds.size} servers`), message.channel.send(`${bot.emojis.find(`name`, 'alert')} The status of the bot has been set to the number of servers.`);
        }
    }

    if(cmd === `${prefix}ticket`){
        let everyone = message.guild.roles.find(`name`, "@everyone");
        let ticketCreator = message.guild.members.find(`id`, `${message.author.id}`)
        let helpText = args.join(" ");
        let newTicketChannel = await message.guild.createChannel(`request-${message.author.id}`);
        let ticketEmbed = new Discord.RichEmbed()
        .addField('Prośba o pomoc', `**STWORZONE PRZEZ:** ${message.author.tag} \n**TRESC ZGLOSZENIA:** ${helpText}`)
        .addField(`Uwaga!`, 'Po zakończeniu pomocy administracja lub użytkownik oczekujący na pomoc powinien zareagować na reakcję poniżej.')
        let tChanelSend = await newTicketChannel.send(ticketEmbed);
        let reactChannel = await tChanelSend.react(bot.emojis.find(`name`, 'success')).then(em => { message.channel.send('Gotowe!') });
        newTicketChannel.overwritePermissions(everyone, { SEND_MESSAGES: false, READ_MESSAGES: false });
        newTicketChannel.overwritePermissions(ticketCreator, { SEND_MESSAGES: true, READ_MESSAGES: true })
        message.channel.send(`${bot.emojis.find(`name`, 'success')} Twoja prośba o pomoc jest gotowa, poczekaj na odpowiedź od administracji na kanale **${newTicketChannel}** `);
        const filter = (reaction, user) => (reaction.emoji.name === '🇦') && user.id === message.author.id
        const collector = tChannelSend.createReactionCollector(filter);
        collector.on('collect', r => {
            if (r.emoji.name === "🇦") {
                message.channel.send('Gotowe!');
            }
        });
    }

    if(cmd === `${prefix}warn`){
        if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`${bot.emojis.find(`name`, 'lock')}` + " You do not have sufficient permissions. You must have `MANAGE_MEMBERS` permissions.");
        //if (args[0] == `${message.author.bot}`) return;
        if (args[0] == `${message.author}`) return message.channel.send(`${bot.emojis.find(`name`, 'error')} You can not give yourself a warn!`)
        let wUser = message.mentions.users.first();
        if (!wUser) return message.channel.send(`${bot.emojis.find(`name`, 'error')} Is this user exists? Because I can not find him!`);
        const reason = args.join(" ").slice(22);

        if (!warns[wUser.id]) {
            warns[wUser.id] = {
                warns: 0
            };
        }

        warns[wUser.id].warns++;

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });

        const warnEmbed = new Discord.RichEmbed()
        //.setDescription("WARN")
        .setAuthor(`[WARN] ${wUser.tag}`, wUser.displayAvatarURL)
        .setColor("#9b0090")
        //.addField("Warned user:", `${wUser}`)
        .addField("Channel:", message.channel)
        //.addField("O godzinie", moment(message.createdAt).format("YYYY.MM.DD, HH:mm:ss"))
        .addField("Number of warnings:", warns[wUser.id].warns)
        .addField("Moderator:", message.author.tag)
        .addField("Reason:", reason)
        .setFooter(`${message.createdAt.getHours()}:${message.createdAt.getMinutes()} | Warned on ${message.guild.name}.`)

        const warnchannel = message.guild.channels.find("name", "modlogs");
        if (!warnchannel) return message.reply(`${bot.emojis.find(`name`, 'error')} The 'modlogs' channel does not exist! Create it, otherwise I will not give a warning!`);
        warnchannel.send(warnEmbed);

        if (warns[wUser.id].warns === 15) {
            message.guild.member(wUser).ban(reason);
            message.message.channel.send(`${bot.emojis.find(`name`, 'alert')} The ${wUser.tag} user has been banned because he has reached the maximum number of warnings!`);
        }

        message.channel.send(`${bot.emojis.find(`name`, 'success')} The **${wUser.tag}** user was successfully warned for **${reason}**!`);

    };

    if(cmd === `${prefix}warns`){
        if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply(`${bot.emojis.find(`name`, 'lock')}` + " You do not have sufficient permissions. You must have `MANAGE_MEMBERS` permissions.");
        let wUser = message.mentions.users.first();
        if (!wUser) return message.reply(`${bot.emojis.find(`name`, 'error')} Is this user exists? Because I can not find him!`);
        const warns = warns[wUser.id].warns;
        let warnsEmbed = new Discord.RichEmbed()
        .addField(`User:`, wUser.tag)
        .addField(`Number of warnings:`, warns)
        message.channel.send(warnsEmbed);
    }
    
});

//let everyone = message.guild.roles.find(`name`, "@everyone");
//if(args[0] == 'lock') return message.channel.overwritePermissions(everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false }), message.channel.send(`${bot.emojis.find(`name`, 'success')} Okay, according to your wishes, I blocked this channel! Others can not write here.`);

bot.login(process.env.TOKEN);
