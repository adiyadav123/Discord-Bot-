const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('Sends dm to a targeted user')
		.addUserOption(option => option.setName('target').setDescription('The user to send message').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription("The message you want to send!").setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {

		
		try{
			const user = interaction.options.getUser('target');
			const mes = interaction.options.getString('message');
			user.send(mes)
			const em = new EmbedBuilder()
			.setColor("Green")
			.setDescription(`Sent direct message to ${user} successfully`)
			if (user) return interaction.reply({embeds: [em]});
			return interaction.reply(`Sent direct message to ${user} successfully`);
	}catch(error){
		const err = new EmbedBuilder()
		.setColor("Red")
		.setTitle("An error occurred")
		.setDescription("You do not have permissions to run this command!")
		return interaction.reply({embeds: [err]})
	}
	},
};