const { SlashCommandBuilder, EmbedBuilder, User, PermissionFlagsBits } = require('discord.js');
const  rollSchema  = require('../../Schemas.js/roll');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setrickrollchannel")
    .setDescription('It will ping the users who got rickrolled!')
    .addChannelOption(options => options.setName('channel').setDescription('The channel where you want to send').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const { user, guild, options } = interaction;
        const channel = options.getChannel('channel');
        // console.log(channel.id)
        const Data = await rollSchema.findOne({ Guild: guild.id, User: user.id, Channel: channel.id });
        if(!Data){
            rollSchema.create({
                Guild: guild.id,
                User: user.id,
                Channel: channel.id
            })
        }
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`I set the rickrolled users list channel to ${channel}`)
        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}