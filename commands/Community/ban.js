const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user")
    .addUserOption(option => option.setName("user").setDescription("Select a user you want to ban").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction){
        try{
                let user = interaction.options.getUser("user")
                guild.members.ban(user);
       
                const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Banned ${user} :white_check: `)
       
                await interaction.reply({embeds: [embed]})
        }catch(error){
           return console.log(error);
        }
    }
}