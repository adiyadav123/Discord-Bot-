const { Client, GatewayIntentBits, EmbedBuilder, Collection, Events, ActivityType, MessageAttachment, AttachmentBuilder, GuildMember, Guild, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildChannel, ChannelType, PermissionsBitField } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const { token, mogodburl } = require('./config.json')
const mongoose = require('mongoose');


client.commands = new Collection();
// Initialize the invite cache

// A pretty useful method to create a delay without blocking the whole script.
const wait = require("timers/promises").setTimeout;

client.once('ready', async () => {
    console.log('Ready!');


    if (!mogodburl) return;
    mongoose.connect(mogodburl || '', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    if (mongoose.connect) {
        console.log("The database is running!")
    }

    try {
        // client.user.setActivity({ name: ` ${client.guilds.cache.size} servers!`, type: ActivityType.Watching })
        client.user.setActivity({ name: 'Under Construction', type: ActivityType.Watching })

    } catch (error) {
        console.error(error);
    }
})

//   client.on(Events., member => {
//     // Send the message to a designated channel on a server:
//     const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
//     // Do nothing if the channel wasn't found on this server
//     console.log(member.user.username+"Joined the server")
//     if (!channel) console.log("No channel found");

//     const card = new Welcomer()
//     .setUsername(member.user.username)
//     .setDiscriminator(member.user.discriminator)
//     .setMemberCount(member.guild.memberCount.toLocaleString())
//     .setGuildName(member.guild.name)
//     .setAvatar(member.displayAvatarURL())
//     .setText("member-count", "-{count}x member")
//     .setText("title", "WELCOME")
//     .setText("message","welcome to BotTesting server")

//     card.build()
//     .then(buffer => channel.send(new MessageAttachment(buffer, "welcome.png")));
// //   });

// client.on(Events.GuildMemberAdd, async(member) => {
//     const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
//     // Do nothing if the channel wasn't found on this server
//     console.log(member.user.username+"Joined the server")
//     if (!channel) console.log("No channel found");

//     const card = new Welcomer()
//     .setUsername(member.user.username)
//     .setDiscriminator(member.user.discriminator)
//     .setMemberCount(member.guild.memberCount.toLocaleString())
//     .setGuildName(member.guild.name)
//     .setAvatar(member.displayAvatarURL())
//     .setText("member-count", "-{count}x member")
//     .setText("title", "WELCOME")
//     .setText("message","welcome to BotTesting server")

//     card.build()
//     .then(buffer => channel.send(new Discord.MessageAttachment(buffer, "welcome.png")));
// })


const functions = fs.readdirSync('./functions').filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolders, "./commands");
    client.login(token)
})();

const levelSchema = require('./Schemas.js/level');

client.on(Events.MessageCreate, async (message) => {
    try {
        const { guild, author } = message;

        if (!guild || author.bot) return;
        levelSchema.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {
            if (err) throw err;

            if (!data) {
                levelSchema.create({
                    Guild: guild.id,
                    User: author.id,
                    Level: 1,
                    XP: 1
                })
            }
        });

        const channel = message.channel;

        const give = 2;
        const data = await levelSchema.findOne({ Guild: guild.id, User: author.id })
        const requiredXP = data.Level * data.Level * 20 + 20;

        if (data.XP + give >= requiredXP) {
            data.XP += give;
            data.Level += 1;
            await data.save();

            if (!channel) return;

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`🎉 Congracts, ${author} you have reached level ${data.Level}`)
            channel.send({ embeds: [embed] })
        }
        else {
            data.XP += give;
            data.save()
        }
    } catch (err) {
        console.log(err)
    }

});
const { QuickDB } = require('quick.db');
const db = new QuickDB();

client.on(Events.GuildMemberAdd, async (member) => {
    const channelID = await db.get(`welchannel_${member.guild.id}`);
    const chID = await db.get(`welchannel_${member.guild.id}`);
    const ch = member.guild.channels.cache.get(chID);
    if (channelID == null) return;
    if (chID == null) return;

    console.log(member.user.username);
    if (channelID == null) return console.log('No channel found!');
    const embed = new EmbedBuilder()
        .setColor("Blue")
        .setImage('https://i.ibb.co/3rF3Rb5/static-2.png')
        .setTitle(`Welcome ${member.user.username} to ${member.guild.name}`)
        .setDescription(`\`\`\`Have a great time with us!\nYou are ${member.guild.memberCount.toLocaleString()}th member!\`\`\``)
    ch.send({ content: `${member.user}`, embeds: [embed] })
})
client.on("messageCreate", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    const antiswearSchema = require('./Schemas.js/antiswear');

    const guild = message.guild;

    let requireDB = await antiswearSchema.findOne({ _id: guild.id });
    if (!requireDB) return;

    if (requireDB.logs === false) return;

    const scamLinks = require('./badwords.json');
    const scamlinks = scamLinks.known_links;
    const embed = new EmbedBuilder()
        .setColor("0x2f3136")
        .setDescription(`:warning: | <@${message.author.id}> has been warned for bad word usage.`)
    for (let i in scamlinks) {
        if (message.content.toLowerCase().includes(scamlinks[i].toLowerCase())) {
            await message.delete();
            message.channel.send({ embeds: [embed] });

            // message.channel.send({
            //     embeds: [
            //         new EmbedBuilder()
            //             .setColor("0x2f3136")
            //             .setDescription(`<@${message.author.id}> has been warned for bad word usage.\n\`\`\`${message.content}\`\`\``)
            //     ]
            // });
        }
    }
})

const modSchema = require('./Schemas.js/mod');

client.on(Events.MessageCreate, async message => {
    if(message.author.bot) return;
    console.log('connected kid')

    const gu = '1055079934135107694';
    const guild = client.guilds.cache.get(gu);
    if (message.channel.type == ChannelType.DM){
        const member = message.author
        console.log('connected')
        member.send('Your modmail conversation has been started').catch(err =>{ 
            console.log(err)
            return;
        });

        modSchema.findOne({ Guild: guild.id, User: member }, async (err, data) => {
            if(err) throw err;

            if(!data){
                modSchema.create({
                    Guild: guild.id,
                    User: member.id
                })
            }
            if(data){
                modSchema.create({
                    Guild: guild.id,
                    User: member.id
                })
            }
        });
        if(message.attachments.size > 0){
            message.react('❎')
            return message.reply('I cannot send this message!')
        }
        const posChannel = guild.channels.cache.find(c => c.name === `${message.author.id}`);
        if(posChannel){
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            .setDescription(`${message.content}`)

            posChannel.send({ embeds: [embed] });
            message.react('📩');
            return;
        }
        const category = guild.channels.cache.get('1080909472773451898');
        const channel = await guild.channels.create({
            name: `mail-${message.author.username}`,
            type: ChannelType.GuildText,
            parent: category,
            topic: `A mail send by - ${message.author.username}`
        });
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`${message.content}`)
        .setTitle('New Mail')
        .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setLabel('Close Mail')
            .setEmoji('❎')
            .setStyle(ButtonStyle.Danger)
        )

        const m = await channel.send({ embeds: [embed], components: [button] });

        const collector = m.createMessageComponentCollector();

        collector.on('collect', async i => {
            if(i.customId == 'button'){
                await channel.delete()
                member.send(`Your mail has been closed in ${guild.name} by a moderator`);
            }
        });
        m.pin()
        message.react('📩')
    }
});
client.on(Events.MessageCreate, async (message) => {
    if(message.author.bot) return;
    if(message.author.id === message.guild.ownerId) return;
    const author = message.author;
    
    const ms = message.content;
    // console.log(ms.length)
    if(ms.length > 75){
        message.reply(`${message.author.username}, you do not have permission to send messages greater than 75 characters.`)
        message.author.send(`${message.author.username}, your message was deleted because it was greater than 75 characters.\nIf you want to send long messages contact to the moderators or owner of ${message.guild.name}`)
        message.delete();
}})

client.on("messageCreate", async message => {
    console.log('read')
    if(message.content == '$ping'){
        message.reply(`Websocket heartbeat: ${client.ws.ping}ms.`)
    }
})
const linkSchema = require('./Schemas.js/link')
client.on(Events.MessageCreate, async message => {
    if(message.content.startsWith('http') || message.content.startsWith('discord.gg') || message.content.startsWith('https://') || message.content.includes('https://') || message.content.includes('discord.gg/')){
        const Data = await linkSchema.findOne({ Guild: message.guild.id });
        if(!Data) return;

        const memberPerms = Data.Perms;
        const user = message.author;
        const member = message.guild.members.cache.get(user.id);

        if(member.permissions.has(memberPerms)) return;

        else{
            await message.channel.reply({ content: `${message.author}, you do not have perms to send links in this channel!` }).attachments(msg => {
                setTimeout( () => msg.delete(), 3000)
            })
            ;(await message).delete();
        }
    }
})
