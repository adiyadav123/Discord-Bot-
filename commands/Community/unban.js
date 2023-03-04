const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user")
    .addUserOption(option => option.setName("user").setDescription("Select a user you want to unban").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction){

        try{
            let user = interaction.options.getUser("user")
            guild.members.unban(user);
            const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Unbanned ${user} :white_check: `)
   
            await interaction.reply({embeds: [embed]})
    }catch(error){
        const err = new EmbedBuilder()
		.setColor("Red")
		.setTitle("An error occurred")
		.setDescription("You do not have permissions to run this command!")

		return interaction.reply({embeds: [err]})
    }
    }
}