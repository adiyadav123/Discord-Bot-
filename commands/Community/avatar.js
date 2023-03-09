const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');

		const embed = new EmbedBuilder()
		.setColor("Blue")
		.setTitle("**Your requested avatar is ready! :tada: **")
		.setAuthor({ name: 'Isey', iconURL: 'https://cdn.discordapp.com/avatars/1039904038231224371/bcf49b70fe17cdbd5c276331eceef269.webp', })
		.setImage(user.displayAvatarURL())
		.setTimestamp()
		.setFooter({ text: 'Created by - Isey#4762'});

		await interaction.reply({embeds: [embed]});
	},
};