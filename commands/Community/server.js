const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {

		// let chann = interaction.guild.channels;
		// console.log(chann)
		try{
			const embed = new EmbedBuilder()
		.setColor("Blue")
		.setTitle(`${interaction.guild.name}`)
		.setThumbnail(`${interaction.guild.iconURL()}`)
		.addFields(
			{ name: "Created at", value: `${interaction.guild.createdAt}`, inline: true },
			{ name: 'Members', value: `${interaction.guild.memberCount}`, inline: true }
		)
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply({ embeds: [embed] });
		}
		catch(error){
			console.log("An error occurred!")
		}
	},
};