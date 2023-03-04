const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reminvitelogschannel')
    .setDescription('rem invites logs channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){

        const embed1 = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`Your logs channel has been succesfully removed`);

        await db.delete(`invchannel_${interaction.guild.id}`);

        await interaction.reply({ embeds: [embed1] });
    }
}