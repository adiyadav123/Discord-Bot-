const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick a user")
    .addUserOption(option => option.setName("user").setDescription("Select a user you want to kick").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction){
         try{
            let member = interaction.options.getMember("user")
         member.kick();

         const embed = new EmbedBuilder()
         .setColor("Green")
         .setDescription(`Kicked ${member} ✔️`)

         await interaction.reply({embeds: [embed]})
         }catch(error){
            let err = new EmbedBuilder()
            .setColor("Red")
            .setTitle("An error occurred")
            .setDescription("An error occured while executing the command!")
         }
    }
}