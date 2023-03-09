const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nuke')
    .setDescription('it will nuke the channel')
    .addChannelOption(
        option => 
        option.setName('channel')
        .setDescription('the channel which you want to nuke')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){
        const { user, guild, options } = interaction;
        const channel = options.getChannel('channel');
        // const owne = guild.owner;
        // user.send(`${channel.name} is nuked by ${interaction.user.username}`)
        channel.delete();
        channel.clone();

        await interaction.reply({ content: 'Channel nuked successfully', ephemeral: true })
        // channel.send(`\`channel nuked by ${interaction.user.username}\``)
    }
}