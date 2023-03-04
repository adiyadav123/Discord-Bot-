const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, SelectMenuBuilder, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require('../../Schemas.js/ticket-schema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket-disable')
    .setDescription('this disables ticket message system')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){
        await ticketSchema.deleteOne({ Guild: interaction.guild.id });
        await interaction.reply({ content: 'Ticket system has been removed from your server!', ephemeral: true })
    }
}