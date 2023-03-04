const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge up to 100 messages.')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to purge')).setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		try{
				const amount = interaction.options.getInteger('amount');
	
			if (amount < 1 || amount > 100) {
				return interaction.reply({ content: 'You need to input a number between 1 and 100.', ephemeral: true });
			}
			await interaction.channel.bulkDelete(amount, true).catch(error => {
				console.error(error);
				interaction.reply({ content: 'There was an error trying to purge messages in this channel!', ephemeral: true });
			});
	
			let user = interaction.user.tag;
	
			const embed = new EmbedBuilder()
			.setColor("DarkGold")
			.setAuthor({ name: 'Isey', iconURL: 'https://cdn.discordapp.com/avatars/1039904038231224371/bcf49b70fe17cdbd5c276331eceef269.webp', })
			.setDescription(`Messages purged by **${user}** `)
			.setTimestamp()
			.setFooter({ text: 'Created by - Isey#4762'});
	
			return interaction.reply({ embeds: [embed]});
		}catch(error){
			const err = new EmbedBuilder()
		.setColor("Red")
		.setTitle("An error occurred")
		.setDescription("You do not have permissions to run this command!")

		return interaction.reply({embeds: [err]})
		}
	},
};