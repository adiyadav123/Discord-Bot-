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
// client.on(Events.InteractionCreate, async interaction => {
//     if(interaction.isButton) return;
//     if(interaction.isChatInputCommand) return;

//     const modal = new ModalBuilder()
//     .setTitle('provide us your information')
//     .setCustomId('modal')

//     const email = new TextInputBuilder()
//     .setCustomId('email')
//     .setRequired(true)
//     .setLabel("Email")
//     .setPlaceholder("Enter your email here!")
//     .setStyle(TextInputStyle.Short)

//     const username = new TextInputBuilder()
//     .setCustomId('username')
//     .setRequired(true)
//     .setLabel("Username")
//     .setPlaceholder("Enter your username here!")
//     .setStyle(TextInputStyle.Short)

//     const reason = new TextInputBuilder()
//     .setCustomId('reason')
//     .setRequired(true)
//     .setLabel("Reason")
//     .setPlaceholder("Reason for opening ticket")
//     .setStyle(TextInputStyle.Paragraph)

//     const first = new ActionRowBuilder().addComponents(email);
//     const second = new ActionRowBuilder().addComponents(username);
//     const third = new ActionRowBuilder().addComponents(reason);

//     modal.addComponents(first, second, third);

// let choices;
//     choices = interaction.values;
//     const result = choices.join('');
//     ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
//         const filter = { Guild: interaction.guild.id };
//         const update = { Ticket: result };

//         ticketSchema.updateOne(filter, update, {
//             new: true
//         }).then(value => {
//             console.log(value);
//         })
//     })

//     if(!interaction.isModalSubmit()){
//         interaction.showModal(modal);
//     }
//     // interaction.showModal(modal)
// });

// 
const ticketSchema = require('./Schemas.js/ticket-schema');
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isStringSelectMenu()) {
        console.log("passed")

        // const modal = new ModalBuilder()
        //     .setTitle('provide us your information')
        //     .setCustomId('modal')

        // const email = new TextInputBuilder()
        //     .setCustomId('email')
        //     .setRequired(true)
        //     .setLabel("Email")
        //     .setPlaceholder("Enter your email here!")
        //     .setStyle(TextInputStyle.Short)

        // const username = new TextInputBuilder()
        //     .setCustomId('username')
        //     .setRequired(true)
        //     .setLabel("Username")
        //     .setPlaceholder("Enter your username here!")
        //     .setStyle(TextInputStyle.Short)

        // const reason = new TextInputBuilder()
        //     .setCustomId('reason')
        //     .setRequired(true)
        //     .setLabel("Reason")
        //     .setPlaceholder("Reason for opening ticket")
        //     .setStyle(TextInputStyle.Paragraph)

        // const first = new ActionRowBuilder().addComponents(email);
        // const second = new ActionRowBuilder().addComponents(username);
        // const third = new ActionRowBuilder().addComponents(reason);

        // modal.addComponents(first, second, third);

        let choices;
        choices = interaction.values;
        const result = choices.join('');
        ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            const filter = { Guild: interaction.guild.id };
            const update = { Ticket: result };

            ticketSchema.updateOne(filter, update, {
                new: true
            }).then(value => {
                console.log(value);
            })
        })

        // if (!interaction.isModalSubmit()) {
        //     await interaction.showModal(modal);
        // }
    }
// })

// client.on(Events.InteractionCreate, async interaction => {
//     if (interaction.isModalSubmit()) {
//         if (interaction.customId === 'modal') {
            ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                // const emailinput = interaction.fields.getTextInputValue('email');
                // const userinput = interaction.fields.getTextInputValue('username');
                // const reasoninput = interaction.fields.getTextInputValue('reason');

                const poschannel = interaction.guild.channels.cache.get(c => c.name === `ticket-${interaction.user.id}`);
                if (poschannel) await interaction.reply({ content: `You already have a ticket opened -${poschannel}`, ephemeral: true });
                const category = data.Channel;

                const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription('Welcome to your ticket, please wait while the staffs review your information')
                    .setTitle(`${interaction.user.username}'s ticket`)
                    .addFields(
                    //     { name: "Email", value: `${emailinput}` },
                    //     { name: "Username", value: `${userinput}` },
                    //     { name: "Reason", value: `${reasoninput}` },
                        { name: "Type", value: `${data.Ticket}` }
                    )
                    .setFooter({ text: `${interaction.guild.name}` })

                const butt = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('ticket')
                            .setLabel('❎ Delete')
                            .setStyle(ButtonStyle.Danger)
                    )

                let channel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    parent: `${category}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                });
                const user = interaction.user;


                let msg = await channel.send({ embeds: [embed], components: [butt] });
                const collector = msg.createMessageComponentCollector();

                collector.on("collect", async i => {
                    ; (channel).delete();

                    const dmembed = new EmbedBuilder()
                        .setColor("Blue")
                        .setDescription('Thanks for contacting us, if you have another problem feel free to create another ticket')
                        .setTitle(`Your ticket has been successfully deleted`)
                        .setFooter({ text: `${interaction.guild.name}` })
                        .setTimestamp()

                    await interaction.member.send({ embeds: [dmembed] }).catch(err => {
                        return;
                    })
                });
            })
//         }
//     }

})