const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invitelogschannel')
    .setDescription('invites logs channel')
    .addChannelOption(option => option.setName('channel').setDescription('the channel you want to send logs   when user joins your server!').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, message){
        const channel = interaction.options.getChannel('channel');

        const embed1 = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`Your invite logs channel has been set to ${channel}`);

        await db.set(`invchannel_${interaction.guild.id}`, channel.id);

        await interaction.reply({ embeds: [embed1] });
    }
}