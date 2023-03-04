const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('removewelcomechannel')
    .setDescription('delete welcome channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){

        const embed1 = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`You invites logs channel has been removed`);

        await db.delete(`welchannel_${interaction.guild.id}`);

        await interaction.reply({ embeds: [embed1] });
    }
}
