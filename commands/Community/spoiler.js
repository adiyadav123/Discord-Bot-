const { SlashCommandBuilder}  = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("spoiler")
        .setDescription("Makes your message as a spoiler")
        .addStringOption(option => option.setName('message').setDescription('Enter your message!')),
    async execute(interaction) {
		const message = interaction.options.getString('message');
        await interaction.reply("||" + message + "||");
    }
}